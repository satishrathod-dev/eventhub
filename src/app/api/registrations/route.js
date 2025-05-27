import db from '@/lib/db';

export async function POST(req) {
  const body = await req.json();
  const { event_id, name, email } = body;

  if (!event_id || !name || !email) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  try {
    const stmt = db.prepare('INSERT INTO registrations (event_id, name, email) VALUES (?, ?, ?)');
    stmt.run(event_id, name, email);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
  }
}
