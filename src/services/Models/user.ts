import bcrypt from 'bcrypt';
import client from '../Database/setup';
import { hash } from 'crypto';
//The complete class based implementation for all functions realted to users
export interface userProps {
    id?: number;
    name: string;
    username: string;
    password: string;
    email: string;
}

export default class User {
    public id?: number;
    public name: string;
    public username: string;
    private password: string;
    public email: string;

    constructor({id, name, username, password, email}: userProps) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public async hashPassword(): Promise<void> {
        const salt = 10;
        this.password = await bcrypt.hash(this.password, salt);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public async save(){
        this.hashPassword();

        await client.query(
            'INSERT INTO users (name, username, password, email) VALUES ($1, $2, $3, $4)', 
            [this.name, this.username, this.password, this.email]
        );
    }

    public async getPasswordFromUsername(){
        await client.query(
            'SELECT password FROM users WHERE username = $1',
            [this.username]
        );
    }



    


}