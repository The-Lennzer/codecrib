import client from "../Database/setup";
export interface project {
    id?: string;
    user_id: string;
    title: string;
    description: string;
    project_size: 1 | 2 | 3 | 4 | 5;
    colab_status: boolean;
    percentage_complete: number;
    is_public: boolean;
    tags: string[];
    status: 'active' | 'completed' | 'archived';
}

export default class Project {
    public id?: string;
    public user_id: string;
    public title: string;
    public description: string;
    public project_size: 1 | 2 | 3 | 4 | 5;
    public colab_status: boolean;
    public percentage_complete?: number;
    public is_public: boolean;
    public tags: string[];
    public status: 'active' | 'completed' | 'archived';

    //the constructor with default values for PERCENTAGE_COMPLETE and STATUS
    constructor({
        user_id,
        title,
        description,
        project_size,
        colab_status,
        percentage_complete=0,
        is_public,
        tags,
        status = 'active',
    }: project){
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.project_size = project_size;
        this.colab_status = colab_status;
        this.percentage_complete =  percentage_complete;
        this.is_public =  is_public;
        this.tags = tags;
        this.status = status;                                     //
    }
    
    public async save(){
        //got to save the project to the DB
        //table name: projects
        try{
            await client.query(
                'INSERT INTO projects (user_id, title, description, project_size, colab_status, percentage_complete, is_public, tags, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                                   [this.user_id, this.title, this.description, this.project_size, this.colab_status, this.percentage_complete, this.is_public, this.tags, this.status]
            )
        } catch (error: any) {
            console.error('Error saving project to DB:', error);
            throw error;
        }
    }

    public static async buildFromDB(dbRow: any){
        //builder function that takes a row from the DB and builds a project object
        return new Project({
            id: dbRow.id,
            user_id: dbRow.user_id,
            title: dbRow.title,
            description: dbRow.description,
            project_size: dbRow.project_size,
            colab_status: dbRow.colab_status,
            percentage_complete: dbRow.percentage_complete,
            is_public: dbRow.is_public,
            tags: dbRow.tags,
            status: dbRow.status
        })
    }

    static async findProjectById(id: string): Promise<Project | null> {
        //build a project object from the DB using ID
        try{
            const { rows } = await client.query(
                "SELECT * FROM projects WHERE id = $1",
                [id]
            );
            if ( rows.length === 0) return null;
            return Project.buildFromDB(rows[0]);
        } catch (error) {
            console.error('Error finding project by ID:', error);
            throw new Error('Failed to fetch project by Id');
        }
    }


}