const { getPool } = require('../config/db');

exports.getReviews = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM reviews ORDER BY sort_order');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReview = async (req, res) => {
  const { name, text, rating, sort_order } = req.body;
  if (!name || !text) return res.status(400).json({ error: "name va text majburiy" });
  try {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO reviews (name, text, rating, sort_order) VALUES (?,?,?,?)',
      [name, text, rating || 5, sort_order || 0]);
    res.json({ id: result.insertId, message: "Fikr qo'shildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  const { id, name, text, rating, sort_order } = req.body;
  if (!id) return res.status(400).json({ error: "id majburiy" });
  try {
    const pool = await getPool();
    await pool.query('UPDATE reviews SET name=?, text=?, rating=?, sort_order=? WHERE id=?',
      [name, text, rating, sort_order, id]);
    res.json({ message: "Fikr yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query('DELETE FROM reviews WHERE id=?', [id]);
    res.json({ message: "Fikr o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
