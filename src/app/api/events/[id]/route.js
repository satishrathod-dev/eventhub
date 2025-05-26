import db from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(params.id);

    if (!event) {
      return new Response('Event not found', { status: 404 });
    }

    return Response.json(event);
  } catch (err) {
    return new Response('Error fetching event', { status: 500 });
  }
}
