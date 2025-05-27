import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare(`
      SELECT 
        DATE(created_at) AS date, 
        COUNT(*) AS count 
      FROM registrations 
       WHERE created_at >= DATE('now', '-30 day')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);
    const data = stmt.all();
    return Response.json(data);
  } catch (error) {
    return new Response('Error fetching daily registrations', { status: 500 });
  }
}
