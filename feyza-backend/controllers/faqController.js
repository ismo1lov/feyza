const { getPool } = require('../config/db');

exports.getFaq = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM faq ORDER BY sort_order');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFaq = async (req, res) => {
  const { question, answer, sort_order } = req.body;
  if (!question || !answer) return res.status(400).json({ error: "question va answer majburiy" });
  try {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO faq (question, answer, sort_order) VALUES (?,?,?)',
      [question, answer, sort_order || 0]);
    res.json({ id: result.insertId, message: "FAQ qo'shildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFaq = async (req, res) => {
  const { id, question, answer, sort_order } = req.body;
  if (!id) return res.status(400).json({ error: "id majburiy" });
  try {
    const pool = await getPool();
    await pool.query('UPDATE faq SET question=?, answer=?, sort_order=? WHERE id=?',
      [question, answer, sort_order, id]);
    res.json({ message: "FAQ yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query('DELETE FROM faq WHERE id=?', [id]);
    res.json({ message: "FAQ o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
