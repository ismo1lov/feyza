const { getPool } = require('../config/db');

const DEFAULT_CONTENT = {
  heroTitle: "Tabiiy Go'zalligingizni Kashf Eting",
  heroSubtitle: "O'zingizga g'amxo'rlik va ishonch uyg'unlashgan makon",
  buttonText: "Bog'lanish",
};

exports.getContent = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, heroTitle, heroSubtitle, buttonText FROM content WHERE id = 1');

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.json(DEFAULT_CONTENT);
    }
  } catch (error) {
    console.error('Kontentni olishda xatolik:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateContent = async (req, res) => {
  const { heroTitle, heroSubtitle, buttonText } = req.body;

  if (!heroTitle || !heroSubtitle || !buttonText) {
    return res.status(400).json({ error: "Barcha maydonlar (heroTitle, heroSubtitle, buttonText) to'ldirilishi shart" });
  }

  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id FROM content WHERE id = 1');

    if (rows.length > 0) {
      await pool.query(
        'UPDATE content SET heroTitle = ?, heroSubtitle = ?, buttonText = ? WHERE id = 1',
        [heroTitle, heroSubtitle, buttonText]
      );
    } else {
      await pool.query(
        'INSERT INTO content (id, heroTitle, heroSubtitle, buttonText) VALUES (1, ?, ?, ?)',
        [heroTitle, heroSubtitle, buttonText]
      );
    }

    res.json({ message: "Sayt kontentlari bazada muvaffaqiyatli yangilandi!" });
  } catch (error) {
    console.error('Kontentni yangilashda xatolik:', error.message);
    res.status(500).json({ error: error.message });
  }
};
