import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../Models/user';
import {getUserByUsername} from '../Database/user';
import dotenv from 'dotenv';
dotenv.config();

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, username, password, email} = req.body
        const user = new User({name, username, password, email});
        user.save();
        res.status(201).send("User created successfully!");
    }catch(err){
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

        if(!isPasswordValid) res.status(401).send('Password is incorrect!');
        
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