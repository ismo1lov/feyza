const { getPool } = require('../config/db');

exports.getServices = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM services ORDER BY sort_order');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  const { id, title, description, icon, sort_order } = req.body;
  if (!id || !title) return res.status(400).json({ error: "id va title majburiy" });
  try {
    const pool = await getPool();
    await pool.query('UPDATE services SET title=?, description=?, icon=?, sort_order=? WHERE id=?',
      [title, description, icon, sort_order || 0, id]);
    res.json({ message: "Xizmat yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createService = async (req, res) => {
  const { title, description, icon, sort_order } = req.body;
  if (!title) return res.status(400).json({ error: "title majburiy" });
  try {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO services (title, description, icon, sort_order) VALUES (?,?,?,?)',
      [title, description, icon || 'Sparkles', sort_order || 0]);
    res.json({ id: result.insertId, message: "Xizmat qo'shildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query('DELETE FROM services WHERE id=?', [id]);
    res.json({ message: "Xizmat o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
