import client from "../Database/setup";

export interface post {
    id?: string;
    user_id: string;
    project_id?: string;
    type: 'blog' | 'document';
    title: string;
    content: string;
    is_public?: boolean;
    createdAt?: Date;
}

export default class Post {
    public id: string;
    public user_id: string;
    public project_id?: string | undefined;
    public type: 'blog' | 'document';
    public title: string;
    public content: string;
    public is_public: boolean;
    public createdAt: Date;

    constructor({id="", title, project_id="", type="document", content="", user_id, is_public=false, createdAt=new Date()}: post) {
        this.id = id;
        this.user_id = user_id;
        this.project_id = project_id;
        this.type = type;
        this.title = title;
        this.content = content;
        this.is_public = is_public;
        this.createdAt = createdAt;
    }

    public async save(){
        try{
            client.query('INSERT INTO posts (user_id, project_id, type, title, content, is_public) VALUES ($1, $2, $3, $4, $5, $6)', 
                [this.user_id, this.project_id || null, this.type, this.title, this.content, this.is_public]);
            return this;
        } catch (error: any) {
            console.error('Error saving post to DB:', error);
            throw error;
        }
    }


}