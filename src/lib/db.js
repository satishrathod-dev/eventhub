import Database from 'better-sqlite3';

const db = new Database('db.sqlite');

// Only create schema if tables don't exist
const tableCheck = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='events'")
  .get();

if (!tableCheck) {
  db.exec(`
    CREATE TABLE events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      location TEXT,
      date TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      name TEXT,
      email TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (event_id) REFERENCES events(id)
    );

    
    INSERT INTO events (title, description, location, date)
    VALUES
      ('React Meetup', 'Learn React tricks', 'Pune', '2025-06-01'),
      ('NextJS Conf', 'All about NextJS', 'Mumbai', '2025-06-05'),
      ('AI Workshop', 'Intro to AI', 'Remote', '2025-06-10');
  `);
}

export default db;
