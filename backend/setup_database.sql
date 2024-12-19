-- Create newsletters database
CREATE DATABASE newsletters;

-- Create user
CREATE USER joedavini WITH PASSWORD 'JoeyJames2024$';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE newsletters TO joedavini;

-- Connect to the database
\c newsletters

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Optional: Verify setup
\du
\l
