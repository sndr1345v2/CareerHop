import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { log } from './vite';

// Default to in-memory for development if DATABASE_URL is not provided
let dbUrl = process.env.DATABASE_URL;

// Parse Heroku's DATABASE_URL if provided
if (dbUrl && process.env.NODE_ENV === 'production') {
  // Heroku PostgreSQL requires SSL
  if (!dbUrl.includes('?sslmode=')) {
    dbUrl += '?sslmode=require';
  }
  
  log('Using Heroku PostgreSQL database');
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