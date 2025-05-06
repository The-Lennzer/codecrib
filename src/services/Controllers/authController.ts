import {Request, Response} from 'express';
import User from '../Models/user';

export const Register = (req: Request, res: Response) => {
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

export const Login = (req: Request, res:Response) => {
    res.send("Logged in succesfully!");
}