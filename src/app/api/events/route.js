import db from '@/lib/db';

export async function GET(req) {
  try {

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    const stmt = db.prepare(`
      SELECT 
        events.*,
        IFNULL(reg_counts.count, 0) AS attendees
      FROM events
      LEFT JOIN (
        SELECT event_id, COUNT(*) AS count
        FROM registrations
        GROUP BY event_id
      ) reg_counts ON reg_counts.event_id = events.id
      LIMIT ? OFFSET ?
    `);    

    const events = stmt.all(limit, offset);
    console.log("events", events)

    return Response.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    return new Response('Error fetching events', { status: 500 });
  }
}

// testing with static data
// export async function GET() {
//   return Response.json([{ id: 1, title: "Test Event" }]);
// }