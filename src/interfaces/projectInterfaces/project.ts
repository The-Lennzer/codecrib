export interface projectInput {
    title: string;
    description: string;
    project_size: 1 | 2 | 3 | 4 | 5;
    colab_status: boolean;
    percentage_complete: number;
    is_public: boolean;
    tags: string[];
    status: 'active' | 'completed' | 'archived';
}

export interface postInput {
    title: string;
    type: 'blog' | 'document';
    content: string;
    is_public: boolean;
}
