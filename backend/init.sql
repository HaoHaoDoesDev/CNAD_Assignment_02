-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    streak_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Pet Table (Linked to users or shared flat)
CREATE TABLE IF NOT EXISTS shared_pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) DEFAULT 'FlatPet',
    hunger_level INT DEFAULT 100,
    health INT DEFAULT 100,
    last_fed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);