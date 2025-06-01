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
    email_verified: boolean;
}

export default class User {
    public id?: number;
    public name: string;
    public username: string;
    private password: string;
    public email: string;
    public email_verified: boolean;

    constructor({id, name, username, password, email}: userProps) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.email_verified = false;
    }

    public async hashPassword(): Promise<void> {
        const salt = 10;
        this.password = await bcrypt.hash(this.password, salt);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public async save(){
        await this.hashPassword();

        await client.query(
            'INSERT INTO users (name, username, password, email, email_verified) VALUES ($1, $2, $3, $4, $5)', 
            [this.name, this.username, this.password, this.email, this.email_verified]
        );
    }

    public async getPasswordFromUsername(){
        await client.query(
            'SELECT password FROM users WHERE username = $1',
            [this.username]
        );
    }

    public static async fromDB(dbRow: any, ){
        return new User({
            id: dbRow.id,
            name: dbRow.name,
            username: dbRow.username,
            password: dbRow.password,
            email: dbRow.email,
            email_verified: dbRow.email_verified
        })
    }

}