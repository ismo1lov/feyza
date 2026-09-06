const { getPool } = require('../config/db');

const DEFAULTS = {
  phone: "+998 99 723 21 32",
  telegram: "@Feyza_aura",
  telegram_link: "https://t.me/Feyza_aura",
  instagram: "@feyza_aura",
  instagram_link: "https://www.instagram.com/feyza_aura/",
  location: "Toshkent, O'zbekiston",
};

exports.getContact = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM contact WHERE id = 1');
    if (rows.length > 0) {
      const { createdAt, updatedAt, ...data } = rows[0];
      res.json(data);
    } else {
      res.json(DEFAULTS);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  const { phone, telegram, telegram_link, instagram, instagram_link, location } = req.body;
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id FROM contact WHERE id = 1');
    if (rows.length > 0) {
      await pool.query(
        'UPDATE contact SET phone=?, telegram=?, telegram_link=?, instagram=?, instagram_link=?, location=? WHERE id=1',
        [phone, telegram, telegram_link, instagram, instagram_link, location]
      );
    } else {
      await pool.query(
        'INSERT INTO contact (id, phone, telegram, telegram_link, instagram, instagram_link, location) VALUES (1,?,?,?,?,?,?)',
        [phone, telegram, telegram_link, instagram, instagram_link, location]
      );
    }
    res.json({ message: "Kontakt ma'lumotlari yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
