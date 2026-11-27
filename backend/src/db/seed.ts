import { pool } from './index';
import bcrypt from 'bcryptjs';

export async function initDb() {
  console.log('Initializing database tables...');
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'attendee',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      event_date VARCHAR(50) NOT NULL,
      location VARCHAR(150) NOT NULL,
      price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
      is_featured BOOLEAN DEFAULT false,
      description TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS registrations (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      attendee_name VARCHAR(100) NOT NULL,
      attendee_email VARCHAR(150) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Tables verified.');
}

export async function seedDb() {
  await initDb();

  const userCheck = await pool.query('SELECT COUNT(*) FROM users');
  if (parseInt(userCheck.rows[0].count, 10) === 0) {
    const defaultPassword = await bcrypt.hash('password123', 10);
    await pool.query(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES 
        ('Admin User', 'admin@eventify.com', $1, 'organizer'),
        ('Test Attendee', 'user@eventify.com', $1, 'attendee')
    `, [defaultPassword]);
    console.log('Seeded demo users.');
  }

  const eventCheck = await pool.query('SELECT COUNT(*) FROM events');
  if (parseInt(eventCheck.rows[0].count, 10) === 0) {
    await pool.query(`
      INSERT INTO events (title, category, event_date, location, price, is_featured, description)
      VALUES 
        ('Future Tech Summit', 'technology', 'DEC 15, 2026', 'Hyderabad, India', 299, true, 'Explore the future of AI, cloud, and modern software technologies with industry leaders.'),
        ('Live Music Night', 'music', 'DEC 20, 2026', 'Hyderabad, India', 499, true, 'An unforgettable night of indie rock, electronic fusion, and live acoustics.'),
        ('Creative Design Workshop', 'education', 'DEC 25, 2026', 'Hyderabad, India', 0, true, 'Hands-on UI/UX and product design workshop for aspiring designers.'),
        ('Art and Culture Festival', 'arts', 'JAN 05, 2027', 'Bangalore, India', 199, false, 'Immerse yourself in traditional and modern art exhibits, craft workshops, and performances.'),
        ('Startup Networking Meet', 'business', 'JAN 10, 2027', 'Chennai, India', 799, false, 'Connect with founders, investors, and innovators in the startup ecosystem.'),
        ('Web Development Bootcamp', 'technology', 'JAN 15, 2027', 'Pune, India', 0, false, 'Full stack web development crash course covering modern frameworks and APIs.');
    `);
    console.log('Seeded 6 Eventify events matching UI.');
  }
}

if (require.main === module) {
  seedDb()
    .then(() => {
      console.log('Seed completed successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}
