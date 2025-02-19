import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
 
// Ensure a single database connection instance for ths application
const dbPromise = (async () => {
    return await open({
        filename: './src/database/db.sqlite',
        driver: sqlite3.Database
    });
})();
 
// Setup function that can be used on server startup
export const setupDatabase = async () => {
    const sql = fs.readFileSync('./src/database/setup.sql', 'utf-8');
    const db = await dbPromise;
    await db.exec(sql);
};
 
export default dbPromise;