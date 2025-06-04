CREATE TYPE post_type AS ENUM ('blog', 'document');

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

    title TEXT NOT NULL CHECK (char_length(title) > 0),       // |
    content TEXT NOT NULL,                                    // | MATTERS
    type post_type NOT NULL,                                  // |
    
    
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (
        (type = 'document' AND project_id IS NOT NULL) OR
        (type = 'blog')
    )
);