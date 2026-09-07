const { getPool } = require('../config/db');
const { saveBase64Image } = require('../utils/saveBase64Image');

exports.getGallery = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY sort_order');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGalleryItem = async (req, res) => {
  const image_url = saveBase64Image(req.body.image_url);
  const { alt_text, sort_order } = req.body;
  if (!image_url) return res.status(400).json({ error: "image_url majburiy" });
  try {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO gallery (image_url, alt_text, sort_order) VALUES (?,?,?)',
      [image_url, alt_text || '', sort_order || 0]);
    res.json({ id: result.insertId, message: "Rasm qo'shildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGalleryItem = async (req, res) => {
  const id = req.body.id || req.params.id;
  const image_url = saveBase64Image(req.body.image_url);
  const { alt_text, sort_order } = req.body;
  if (!id) return res.status(400).json({ error: "id majburiy" });
  try {
    const pool = await getPool();
    await pool.query('UPDATE gallery SET image_url=?, alt_text=?, sort_order=? WHERE id=?',
      [image_url, alt_text || '', sort_order || 0, id]);
    res.json({ message: "Rasm yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query('DELETE FROM gallery WHERE id=?', [id]);
    res.json({ message: "Rasm o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
