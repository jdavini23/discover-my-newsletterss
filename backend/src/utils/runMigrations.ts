import { initializeDatabase } from '../config/database';
import { AppDataSource } from '../config/database';

// Migration runner with explicit return type
export const runMigrations = async (): Promise<void> => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Run migrations
    await AppDataSource.runMigrations();

    console.log('Migrations run successfully');
  } catch (_error) {
    console.error('Error running migrations');
    throw new Error('Failed to run migrations');
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
  } catch (_error) {
    console.error('Error checking migration status');
    throw new Error('Failed to check migration status');
  }
};

// Run the migration script if this file is directly executed
if (require.main === module) {
  void runMigrations()
    .then(() => console.log('Migration process completed'))
    .catch((_error) => {
      console.error('Migration process failed');
      process.exit(1);
    });
}
