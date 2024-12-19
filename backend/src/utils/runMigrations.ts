import { initializeDatabase } from '../config/database';
import { AppDataSource } from '../config/database';

async function runMigrations() {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Run migrations
    await AppDataSource.runMigrations();

    console.log('Migrations run successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    // Close the database connection
    await AppDataSource.destroy();
  }
}

// Run the migration script
runMigrations()
  .then(() => console.log('Migration process completed'))
  .catch(console.error);
