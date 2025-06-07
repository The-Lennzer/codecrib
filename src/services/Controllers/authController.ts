import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/user';
import dotenv from 'dotenv';4
import { registerSchema } from '../../validators/registrationValidator';
import AuthManager from '../Managers/authManager';
dotenv.config();

const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const validatedBody = registerSchema.safeParse(req.body);
        console.log('validatedBody: ', validatedBody);
          if (!validatedBody.success) {
            res.status(400).json({
            error: 'Invalid Attributes!',
            issues: validatedBody.error.issues,
            });
            return;
        }
        const {name, username, password, email} = validatedBody.data;
        const user = await AuthManager.registerUser({name, username, password, email});
        if (user === null) { throw new Error("User creation failed!"); }
        res.status(201).send("User created successfully!");
    } catch(err) {
        res.status(500).send("User creation failed!");
        console.log("user creation error:", err);
    }
}

const LoginUser = async (req: Request, res:Response, next: NextFunction) => {
    console.log("in login function", req.body);
    console.log(process.env.JWT_SECRET_KEY);
    try{
        const {username, password} = req.body;
        const [token, user] = await AuthManager.loginUser(username, password);
        if(token === null) {
            throw new Error("User login failed!");
        } else {
            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000
            });
            res.status(200).json({user});
            return;
        }
    }catch(err){
        console.log("user login error:", err);
        res.status(400).send("User login failed!");
        return;     
    }
}

const hydrateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.userId as string;
        const user = await User.findUserById(userId);

        if(!user) {
            res.status(404).send('User not found!');
            return;
        }

        res.status(200).json({user});

    } catch(err){
        console.log("user hydration error:", err);
        res.status(500).send("User hydration failed!");
        return;     
    }
}

export {
    RegisterUser,
    LoginUser,
    hydrateUser
}