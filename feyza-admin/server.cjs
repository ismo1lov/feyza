const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://localhost:5000';

app.use('/api', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq) => {
      proxyReq.setHeader('host', new URL(API_URL).host);
    },
  },
}));

app.use('/uploads', createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Admin panel running on port ${PORT}`);
  console.log(`Proxying API to ${API_URL}`);
});
