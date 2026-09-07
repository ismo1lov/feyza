const { getPool } = require('../config/db');

exports.getBookings = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const { name, phone, message } = req.body;
  if (!name || !phone) return res.status(400).json({ error: "name va phone majburiy" });
  try {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO bookings (name, phone, message) VALUES (?,?,?)',
      [name, phone, message || '']);
    res.json({ id: result.insertId, message: "Murojaat qabul qilindi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query('DELETE FROM bookings WHERE id=?', [id]);
    res.json({ message: "Murojaat o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
