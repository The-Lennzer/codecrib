CREATE TYPE project_status AS ENUM ('active', 'completed', 'archived');

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    project_size SMALLINT NOT NULL CHECK (project_size >= 1 AND project_size <= 5),
    colab_status BOOLEAN NOT NULL,
    percentage_complete SMALLINT CHECK (percentage_complete >= 0 AND percentage_complete <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_public BOOLEAN DEFAULT TRUE,
    tags TEXT[],
    status project_status DEFAULT 'active'
);