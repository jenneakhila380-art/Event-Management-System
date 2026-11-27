import { Router, Request, Response } from 'express';
import { query } from '../db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/events
// Supports filters identical to events.js: search, location, category, price, sort, featured
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, location, category, price, sort, featured } = req.query;

    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (search && typeof search === 'string') {
      conditions.push(`LOWER(title) LIKE $${paramIndex}`);
      params.push(`%${search.trim().toLowerCase()}%`);
      paramIndex++;
    }

    if (location && typeof location === 'string') {
      conditions.push(`LOWER(location) LIKE $${paramIndex}`);
      params.push(`%${location.trim().toLowerCase()}%`);
      paramIndex++;
    }

    if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
      conditions.push(`LOWER(category) = $${paramIndex}`);
      params.push(category.trim().toLowerCase());
      paramIndex++;
    }

    if (price === 'free') {
      conditions.push(`price = 0`);
    } else if (price === 'paid') {
      conditions.push(`price > 0`);
    }

    if (featured === 'true') {
      conditions.push(`is_featured = true`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    let orderByClause = 'ORDER BY id ASC';
    if (sort === 'price-low') {
      orderByClause = 'ORDER BY price ASC';
    } else if (sort === 'price-high') {
      orderByClause = 'ORDER BY price DESC';
    } else if (sort === 'name') {
      orderByClause = 'ORDER BY title ASC';
    }

    const sql = `SELECT * FROM events ${whereClause} ${orderByClause}`;
    const result = await query(sql, params);

    res.json({
      count: result.rows.length,
      events: result.rows
    });
  } catch (err: any) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/events/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM events WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/events (Protected - Create event)
router.post('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, category, event_date, location, price, is_featured, description } = req.body;

    if (!title || !category || !event_date || !location) {
      res.status(400).json({ error: 'title, category, event_date, and location are required' });
      return;
    }

    const numericPrice = Number(price) || 0;
    const featuredFlag = Boolean(is_featured);

    const insertResult = await query(
      `INSERT INTO events (title, category, event_date, location, price, is_featured, description, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, category.toLowerCase(), event_date, location, numericPrice, featuredFlag, description || '', req.user?.userId]
    );

    res.status(201).json({
      message: 'Event created successfully',
      event: insertResult.rows[0]
    });
  } catch (err: any) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/events/:id/register (Register for an event)
router.post('/:id/register', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { attendee_name, attendee_email } = req.body;

    if (!attendee_name || !attendee_email) {
      res.status(400).json({ error: 'attendee_name and attendee_email are required' });
      return;
    }

    const eventCheck = await query('SELECT title FROM events WHERE id = $1', [id]);
    if (eventCheck.rows.length === 0) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    const insertResult = await query(
      `INSERT INTO registrations (event_id, user_id, attendee_name, attendee_email)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id, req.user?.userId || null, attendee_name, attendee_email]
    );

    res.status(201).json({
      message: `Successfully registered for ${eventCheck.rows[0].title}`,
      registration: insertResult.rows[0]
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
