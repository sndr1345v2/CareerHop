import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { log } from './vite';

// Default to in-memory for development if DATABASE_URL is not provided
let dbUrl = process.env.DATABASE_URL;

// Handle cloud provider database connection
if (dbUrl && process.env.NODE_ENV === 'production') {
  // Prepare connection string based on the environment
  const isGoogleCloud = process.env.K_SERVICE || process.env.GOOGLE_CLOUD_PROJECT;
  
  if (isGoogleCloud) {
    // Google Cloud SQL often uses socket connections
    if (process.env.INSTANCE_CONNECTION_NAME) {
      // If using Cloud SQL socket path
      const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
      dbUrl = `${dbUrl}?host=${dbSocketPath}/${process.env.INSTANCE_CONNECTION_NAME}`;
    } else {
      // Using standard TCP connection to Cloud SQL
      if (!dbUrl.includes('?sslmode=')) {
        dbUrl += '?sslmode=require';
      }
    }
    log('Using Google Cloud SQL database');
  } else {
    // For other cloud providers that use simple connection strings
    if (!dbUrl.includes('?sslmode=')) {
      dbUrl += '?sslmode=require';
    }
    log('Using cloud PostgreSQL database');
  }
} else {
  log('Using in-memory storage (no DATABASE_URL provided)');
}

// Setup database connection if DATABASE_URL is provided
export const setupDatabase = async () => {
  if (!dbUrl) {
    return null;
  }

  try {
    // Client for migrations
    const migrationClient = postgres(dbUrl, { max: 1 });
    
    // Create db client
    const db = drizzle(migrationClient);
    
    // Run migrations
    log('Running database migrations...');
    await migrate(db, { migrationsFolder: './migrations' });
    log('Migrations completed successfully');
    
    return db;
  } catch (error) {
    console.error('Database setup failed:', error);
    return null;
  }
};