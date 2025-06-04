import bcrypt from 'bcrypt';
import client from '../Database/setup';
//The complete class based implementation for all functions realted to users
export interface userProps {
    id?: string;
    name: string;
    username: string;
    password: string;
    email: string;
    email_verified: boolean;
}

export default class User {
    public id?: string;
    public name: string;
    public username: string;
    private password: string;
    public email: string;
    public email_verified: boolean;

    constructor({
        id, 
        name, 
        username, 
        password, 
        email,
        email_verified=false
    }: userProps) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.email_verified = email_verified;
    }

    public async hashPassword(): Promise<void> {
        const salt = 10;
        this.password = await bcrypt.hash(this.password, salt);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    public async save(){
        try {
            await this.hashPassword();

            await client.query(
                'INSERT INTO users (name, username, password, email, email_verified) VALUES ($1, $2, $3, $4, $5)', 
                [this.name, this.username, this.password, this.email, this.email_verified]
            );
            return true;
        } catch (error: any) {
            if (error.code === '23505') {
            // PostgreSQL error code for unique violation
            if (error.detail?.includes('username')) {
                throw new Error('Username already taken');
            }
            if (error.detail?.includes('email')) {
                throw new Error('Email already registered');
            }
            throw new Error('Duplicate entry');
            }
            console.error('Error saving user:', error);
            throw error;
        }
    }

    public async getPasswordFromUsername(){
        return await client.query(
            'SELECT password FROM users WHERE username = $1',
            [this.username]
        );
    }

    public static async fromDB(dbRow: any){
        return new User({
            id: dbRow.id,
            name: dbRow.name,
            username: dbRow.username,
            password: dbRow.password,
            email: dbRow.email,
            email_verified: dbRow.email_verified
        })
    }

    public static async findUserByUsername(username: string): Promise<User | null> {
        try{
            const { rows } = await client.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );

            if (rows.length === 0) return null;

            return User.fromDB(rows[0]);
        } catch (error) {
            console.error('Error finding user by username:', error);
            throw new Error('Failed to fetch user by username');
        }
    };

    public static async findUserById(Id: string): Promise<User | null> {
        try{
            const { rows } = await client.query(
                "SELECT * FROM users WHERE id = $1",
                [Id]
            );

            if ( rows.length === 0) return null;

            return User.fromDB(rows[0]);
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw new Error('Failed to fetch user by Id');
        }
    }
}