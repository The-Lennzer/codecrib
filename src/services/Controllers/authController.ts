import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/user';
import {getUserByUsername} from '../Database/user';
import dotenv from 'dotenv';4
import { registerSchema } from '../../validators/registrationValidator';
dotenv.config();

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
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
        const email_verified = false;
        const user = new User({name, username, password, email, email_verified});
        user.save();
        res.status(201).send("User created successfully!");
    } catch(err) {
        res.status(500).send("User creation failed!");
        console.log("user creation error:", err);
    }
}

export const LoginUser = async (req: Request, res:Response, next: NextFunction) => {
    console.log("in login function", req.body);
    console.log(process.env.JWT_SECRET_KEY);
    try{
        const {username, password} = req.body;
        const user = await getUserByUsername(username);
        

        if( !user || user === null) { res.status(404).send('User not found!'); }
        else{

        const isPasswordValid = await user.comparePassword(password)

        if(!isPasswordValid) res.status(401).send('Incorrect username or Password!');
        
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY! as string, {expiresIn: '1h'});
        res.status(200).json({token});
        return;
        }

    }catch(err){
        console.log("user login error:", err);
        res.status(500).send("User login failed!");
        return;     
    }

}