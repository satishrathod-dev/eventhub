import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare(`
      SELECT 
        events.id,
        events.title,
        COUNT(registrations.id) AS total_registrations
      FROM events
      LEFT JOIN registrations ON registrations.event_id = events.id
      WHERE registrations.created_at >= DATE('now', '-30 day')
      GROUP BY events.id
      ORDER BY total_registrations DESC
      LIMIT 5;
    `);
    const data = stmt.all();
    return Response.json(data);
  } catch (error) {
    return new Response('Error fetching popular events', { status: 500 });
  }
}
