const { getPool } = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM section_meta');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBySection = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM section_meta WHERE section_name = ?', [req.params.section]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json({ section_name: req.params.section, title: '', subtitle: '' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { title, subtitle } = req.body;
  const { section } = req.params;
  try {
    const pool = await getPool();
    await pool.query(
      'INSERT INTO section_meta (section_name, title, subtitle) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE title = ?, subtitle = ?',
      [section, title || '', subtitle || '', title || '', subtitle || '']
    );
    res.json({ message: 'Section meta yangilandi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
