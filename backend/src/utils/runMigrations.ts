import { initializeDatabase } from '../config/database';
import { AppDataSource } from '../config/database';
import { DataSource } from 'typeorm';

// Migration runner with explicit return type
export const runMigrations = async (): Promise<void> => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Run migrations
    await AppDataSource.runMigrations();

    console.log('Migrations run successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error; // Re-throw to allow caller to handle
  } finally {
    // Close the database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

// Utility to check migration status
export const checkMigrationStatus = async (): Promise<{
  pending: number;
  applied: number;
}> => {
  try {
    const pendingMigrations = await AppDataSource.showMigrations();
    const appliedMigrations = await AppDataSource.runMigrations({ transaction: 'none' });

    return {
      pending: pendingMigrations.length,
      applied: appliedMigrations.length,
    };
  } catch (error) {
    console.error('Error checking migration status:', error);
    throw error;
  }
};

// Run the migration script if this file is directly executed
if (require.main === module) {
  runMigrations()
    .then(() => console.log('Migration process completed'))
    .catch((error) => {
      console.error('Migration process failed:', error);
      process.exit(1);
    });
}
