const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'codecrib',
    password: 'postgres',
    port: 5432
})

export default client