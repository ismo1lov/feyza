const { getPool } = require('../config/db');

const DEFAULTS = {
  title: "Bizning Tariximiz",
  description: "Feyza Aura - go'zallik va ishonch uyg'unlashgan maskan.",
  value1_title: "Hijyen",
  value1_desc: "Yuqori darajadagi tozalik",
  value2_title: "Professional",
  value2_desc: "Tajribali mutaxassislar",
  value3_title: "Konfor",
  value3_desc: "Qulay muhit",
};

exports.getAbout = async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM about WHERE id = 1');
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

exports.updateAbout = async (req, res) => {
  const { title, description, value1_title, value1_desc, value2_title, value2_desc, value3_title, value3_desc } = req.body;
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id FROM about WHERE id = 1');
    if (rows.length > 0) {
      await pool.query(
        'UPDATE about SET title=?, description=?, value1_title=?, value1_desc=?, value2_title=?, value2_desc=?, value3_title=?, value3_desc=? WHERE id=1',
        [title, description, value1_title, value1_desc, value2_title, value2_desc, value3_title, value3_desc]
      );
    } else {
      await pool.query(
        'INSERT INTO about (id, title, description, value1_title, value1_desc, value2_title, value2_desc, value3_title, value3_desc) VALUES (1,?,?,?,?,?,?,?,?)',
        [title, description, value1_title, value1_desc, value2_title, value2_desc, value3_title, value3_desc]
      );
    }
    res.json({ message: "Ma'lumotlar yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
