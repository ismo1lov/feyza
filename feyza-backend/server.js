require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { getPool } = require('./config/db');
const contentRoutes = require('./routes/content');
const servicesRoutes = require('./routes/services');
const aboutRoutes = require('./routes/about');
const galleryRoutes = require('./routes/gallery');
const faqRoutes = require('./routes/faq');
const certificatesRoutes = require('./routes/certificates');
const reviewsRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const bookingsRoutes = require('./routes/bookings');
const sectionMetaRoutes = require('./routes/sectionMeta');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/content', contentRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/section-meta', sectionMetaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/debug', async (req, res) => {
  const dbInfo = {
    host: process.env.MYSQL_HOST || process.env.MYSQLHOST || 'not set',
    user: process.env.MYSQL_USER || process.env.MYSQLUSER || 'not set',
    database: process.env.MYSQL_DATABASE || process.env.MYSQLDATABASE || 'not set',
    port: process.env.MYSQL_PORT || process.env.MYSQLPORT || 'not set',
    hasPassword: !!(process.env.MYSQL_PASSWORD || process.env.MYSQLPASSWORD),
  };
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT 1 as test');
    dbInfo.connection = 'ok';
    dbInfo.testResult = rows[0].test;
  } catch (e) {
    dbInfo.connection = 'failed';
    dbInfo.error = e.message;
  }
  res.json(dbInfo);
});

app.get('/api/seed-gallery', async (req, res) => {
  try {
    const pool = await getPool();
    const galleryImages = [
      ['/uploads/gallery1.jpg', 'Nail polish collection', 1],
      ['/uploads/gallery2.jpg', 'Beauty tools', 2],
      ['/uploads/gallery3.jpg', 'Spa session', 3],
      ['/uploads/gallery4.jpg', 'Beauty products', 4],
      ['/uploads/gallery5.png', 'Manicure process', 5],
      ['/uploads/gallery6.png', 'Lash lamination', 6],
      ['/uploads/gallery7.png', 'Facial massage', 7],
    ];
    for (const [url, alt, order] of galleryImages) {
      await pool.query('INSERT IGNORE INTO gallery (image_url, alt_text, sort_order) VALUES (?,?,?)', [url, alt, order]);
    }
    res.json({ message: 'Galereya rasmlari qo\'shildi' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/seed-services', async (req, res) => {
  try {
    const pool = await getPool();
    const services = [
      ['Manikyur', 'Professional manikyur xizmatlari', 'Sparkles', 1],
      ['Massaj', 'Relaksatsiya beruvchi massaj', 'Heart', 2],
      ['Laminatsiya', 'Kirpik va qosh laminatsiyasi', 'Eye', 3],
      ['Depilyatsiya', 'Yuqori sifatli depilyatsiya', 'Scissors', 4],
    ];
    for (const [title, description, icon, sort_order] of services) {
      await pool.query('INSERT IGNORE INTO services (title, description, icon, sort_order) VALUES (?,?,?,?)', [title, description, icon, sort_order]);
    }
    res.json({ message: 'Xizmatlar qo\'shildi' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/seed-certificates', async (req, res) => {
  try {
    const pool = await getPool();
    for (let i = 1; i <= 5; i++) {
      await pool.query('INSERT IGNORE INTO certificates (image_url, title, sort_order) VALUES (?,?,?)', [`/uploads/sertifikat-${i}.png`, '', i]);
    }
    res.json({ message: 'Sertifikatlar qo\'shildi' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.status(200).json({
    message: 'Feyza Backend API ishlayapti 🚀',
    docs: '/api/health'
  });
});

app.use((err, req, res, next) => {
  console.error('Xatolik:', err.message);
  res.status(500).json({ error: err.message || 'Server xatoligi' });
});

async function migrate() {
  const pool = await getPool();
  const sql = fs.readFileSync(path.join(__dirname, 'database', 'init.sql'), 'utf8');
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.toUpperCase().startsWith('CREATE DATABASE') && !s.toUpperCase().startsWith('USE '));
  for (const stmt of statements) {
    try {
      await pool.query(stmt);
    } catch (e) {
      if (e.code !== 'ER_TABLE_EXISTS_ERROR' && e.code !== 'ER_DUP_ENTRY') {
        console.error('Migratsiya xatoligi:', e.message);
      }
    }
  }
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM admins');
  if (rows[0].count === 0) {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('mushtariy123', 10);
    await pool.query('INSERT INTO admins (login, password) VALUES (?, ?)', ['mushtariy', hashedPassword]);
    console.log('Admin yaratildi: mushtariy / mushtariy123 ✅');
  }
  console.log('Baza jadvallari tayyor ✅');
}

app.listen(PORT, async () => {
  console.log(`Backend server ${PORT}-portda ishlayapti... 🚀`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  try {
    await migrate();
  } catch (error) {
    console.error('Bazaga ulanishda xatolik:', error.message);
  }
});
