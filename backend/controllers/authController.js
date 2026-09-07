const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { getPool } = require('../config/db');

exports.login = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ error: 'Login va parol talab qilinadi' });
  }
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM admins WHERE login = ?', [login]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Login yoki parol noto'g'ri" });
    }
    const admin = rows[0];
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return res.status(401).json({ error: "Login yoki parol noto'g'ri" });
    }
    const token = crypto.randomBytes(32).toString('hex');
    await pool.query('UPDATE admins SET token = ? WHERE id = ?', [token, admin.id]);
    res.json({ token, user: { id: admin.id, email: admin.login, name: 'Admin' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.me = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token talab qilinadi' });
  }
  const token = authHeader.slice(7);
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, login FROM admins WHERE token = ?', [token]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Token yaroqsiz' });
    }
    const admin = rows[0];
    res.json({ user: { id: admin.id, email: admin.login, name: 'Admin' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token talab qilinadi' });
  }
  const token = authHeader.slice(7);
  const { currentPassword, newPassword, login: newLogin } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: "Parol kamida 6 belgidan iborat bo'lishi kerak" });
  }
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM admins WHERE token = ?', [token]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Token yaroqsiz' });
    }
    const admin = rows[0];
    const valid = await bcrypt.compare(currentPassword, admin.password);
    if (!valid) {
      return res.status(403).json({ error: "Joriy parol noto'g'ri" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newToken = crypto.randomBytes(32).toString('hex');
    await pool.query(
      'UPDATE admins SET login = ?, password = ?, token = ? WHERE id = ?',
      [newLogin || admin.login, hashedPassword, newToken, admin.id]
    );
    res.json({ message: 'Sozlamalar saqlandi', token: newToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
