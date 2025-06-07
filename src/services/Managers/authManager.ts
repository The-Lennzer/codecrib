//auth manager manages login and sign-up for now but might also handle Oauth later
import client from "../Database/setup";
import User from "../Models/user";
import jwt from "jsonwebtoken";
export default class AuthManager {
    static async loginUser(username: string, password: string) {
        
        const user = await User.findUserByUsername(username);
        if (!user) throw new Error("User not found");

        const isValid = await user.comparePassword(password);
        if (!isValid) throw new Error("Invalid password");

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY! as string, {expiresIn: '1h'});

        return [token, user];
    }

    static async registerUser(userProps: {
        name: string;
        username: string;
        password: string;
        email: string;
    }): Promise<User> {
        const user = new User({...userProps, email_verified: false});
        const saveStatus = await user.save();
        console.log(saveStatus);
        return user;
    }
}