import client from "../Database/setup";
import User from "../Models/user";

export const getUserByUsername = async (username: string): Promise<User | null> => {
    const { rows } = await client.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    if (rows.length === 0) return null;
    return User.fromDB(rows[0]);
};