const pg = require('pg');

const pool = new pg.Pool({
    database: 'weekend-todo-app',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', ()=> {
    console.log('PG is connected');
})

pool.on('error', (error) => {
    console.log('Error with PG connection', error);
});

module.exports = pool;