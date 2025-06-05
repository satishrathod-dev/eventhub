// // scripts/seed.js

// import Database from 'better-sqlite3';
// import { faker } from '@faker-js/faker';

// const db = new Database('db.sqlite');

// // Set pragmas for better bulk insert performance
// db.pragma('journal_mode = WAL');
// db.pragma('synchronous = OFF');

// // Prepare insert statements
// const insertEvent = db.prepare(`
//   INSERT INTO events (title, description, location, date)
//   VALUES (?, ?, ?, ?)
// `);

// const insertRegistration = db.prepare(`
//   INSERT INTO registrations (event_id, name, email, created_at)
//   VALUES (?, ?, ?, ?)
// `);

// // Transaction wrapper for performance
// const insertEventsTxn = db.transaction((count) => {
//   for (let i = 0; i < count; i++) {
//     const title = faker.company.catchPhrase();
//     const description = faker.lorem.sentence();
//     const location = faker.location.city();
//     const date = faker.date.between({ from: '2024-01-01', to: '2025-12-31' }).toISOString();

//     insertEvent.run(title, description, location, date);
//   }
// });

// const insertRegistrationsTxn = db.transaction((count, eventCount) => {
//   for (let i = 0; i < count; i++) {
//     const eventId = faker.number.int({ min: 1, max: eventCount });
//     const name = faker.person.fullName();
//     const email = faker.internet.email();
//     const createdAt = faker.date.between({ from: '2024-01-01', to: '2025-12-31' }).toISOString();

//     insertRegistration.run(eventId, name, email, createdAt);
//   }
// });

// // Main
// console.log('Seeding database...');
// console.time('Seed Time');

// const totalEvents = 100_000;
// const totalRegistrations = 1_000_000;

// console.log(`Inserting ${totalEvents} events...`);
// insertEventsTxn(totalEvents);

// console.log(`Inserting ${totalRegistrations} registrations...`);
// insertRegistrationsTxn(totalRegistrations, totalEvents);

// console.timeEnd('Seed Time');
// console.log('Done!');

// scripts/seed.js

import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";

const db = new Database("db.sqlite");

// Set pragmas for better bulk insert performance
db.pragma("journal_mode = WAL");
db.pragma("synchronous = OFF");

console.log("Clearing existing data...");
db.exec(`
  DELETE FROM registrations;
  DELETE FROM events;
  VACUUM;
`);

// Prepare insert statements
const insertEvent = db.prepare(`
  INSERT INTO events (title, description, location, date)
  VALUES (?, ?, ?, ?)
`);

const insertRegistration = db.prepare(`
  INSERT INTO registrations (event_id, name, email, created_at)
  VALUES (?, ?, ?, ?)
`);

// Transaction wrapper for performance
const insertEventsTxn = db.transaction((count) => {
    const eventIds = [];
    for (let i = 0; i < count; i++) {
      const title = faker.company.catchPhrase();
      const description = faker.lorem.sentence();
      const location = faker.location.city();
      const date = faker.date.between({ from: "2024-01-01", to: "2025-12-31" }).toISOString();
  
      const info = insertEvent.run(title, description, location, date);
      eventIds.push(info.lastInsertRowid);
    }
    return eventIds;
  });
  

  const insertRegistrationsTxn = db.transaction((count, eventIds) => {
    for (let i = 0; i < count; i++) {
      const eventId = eventIds[faker.number.int({ min: 0, max: eventIds.length - 1 })];
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const createdAt = faker.date.between({ from: "2024-01-01", to: "2025-12-31" }).toISOString();
  
      insertRegistration.run(eventId, name, email, createdAt);
    }
  });
  

// Main
console.log("Seeding database...");
console.time("Seed Time");

const totalEvents = 10000;
const totalRegistrations = 1_000000;

console.log(`Inserting ${totalEvents} events...`);
const eventIds = insertEventsTxn(totalEvents);

console.log(`Inserting ${totalRegistrations} registrations...`);
insertRegistrationsTxn(totalRegistrations, eventIds);

console.timeEnd("Seed Time");
console.log("Done!");
