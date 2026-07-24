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
const uploadRoutes = require('./routes/upload');

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
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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

const adminDist = path.join(__dirname, '..', 'feyza-admin', 'dist');
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  const filePath = path.join(adminDist, req.path === '/' ? 'index.html' : req.path);
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  const indexPath = path.join(adminDist, 'index.html');
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
  res.status(200).json({
    message: 'Backend ishlayapti',
    baseUrl: `http://localhost:${PORT}`,
    endpoints: {
      health: `http://localhost:${PORT}/api/health`,
      content: `http://localhost:${PORT}/api/content`,
      services: `http://localhost:${PORT}/api/services`,
      about: `http://localhost:${PORT}/api/about`,
      gallery: `http://localhost:${PORT}/api/gallery`,
      faq: `http://localhost:${PORT}/api/faq`,
      certificates: `http://localhost:${PORT}/api/certificates`,
      reviews: `http://localhost:${PORT}/api/reviews`,
      contact: `http://localhost:${PORT}/api/contact`,
      bookings: `http://localhost:${PORT}/api/bookings`,
      upload: `http://localhost:${PORT}/api/upload`,
    }
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
