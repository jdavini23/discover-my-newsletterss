"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const database_2 = require("../config/database");
async function runMigrations() {
    try {
        // Initialize database connection
        await (0, database_1.initializeDatabase)();
        // Run migrations
        await database_2.AppDataSource.runMigrations();
        console.log('Migrations run successfully');
    }
    catch (error) {
        console.error('Error running migrations:', error);
    }
    finally {
        // Close the database connection
        await database_2.AppDataSource.destroy();
    }
}
// Run the migration script
runMigrations()
    .then(() => console.log('Migration process completed'))
    .catch(console.error);
