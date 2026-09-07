const { getPool } = require('../config/db');
const { saveBase64Image } = require('../utils/saveBase64Image');

exports.getCertificates = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM certificates ORDER BY sort_order');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCertificate = async (req, res) => {
  const image_url = saveBase64Image(req.body.image_url);
  const { title, sort_order } = req.body;
  if (!image_url) return res.status(400).json({ error: "image_url majburiy" });
  try {
    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO certificates (image_url, title, sort_order) VALUES (?,?,?)',
      [image_url, title || '', sort_order || 0]);
    res.json({ id: result.insertId, message: "Sertifikat qo'shildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCertificate = async (req, res) => {
  const id = req.body.id || req.params.id;
  const image_url = saveBase64Image(req.body.image_url);
  const { title, sort_order } = req.body;
  if (!id) return res.status(400).json({ error: "id majburiy" });
  try {
    const pool = await getPool();
    await pool.query('UPDATE certificates SET image_url=?, title=?, sort_order=? WHERE id=?',
      [image_url, title || '', sort_order || 0, id]);
    res.json({ message: "Sertifikat yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getPool();
    await pool.query('DELETE FROM certificates WHERE id=?', [id]);
    res.json({ message: "Sertifikat o'chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
