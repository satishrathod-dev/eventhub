import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare(`
      SELECT 
        events.*,
        (
          SELECT COUNT(*) 
          FROM registrations 
          WHERE registrations.event_id = events.id
        ) AS attendees
      FROM events
    `);

    const events = stmt.all();

    return Response.json(events);
  } catch (err) {
    return new Response('Error fetching events', { status: 500 });
  }
}
