import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DBNAME,
});
