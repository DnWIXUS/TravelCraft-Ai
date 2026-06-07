require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const pool = require('./db');

const { getPackages, createPackage } = require('./controllers/packagesController');
const { getBookings, createBooking, updateBooking } = require('./controllers/bookingsController');
const { enrichCountry } = require('./controllers/enrichController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.get('/api/enrich', enrichCountry);

app.get('/api/packages', getPackages);
app.post('/api/packages', createPackage);

app.get('/api/bookings', getBookings);
app.post('/api/bookings', createBooking);
app.put('/api/bookings/:id', updateBooking);

const PORT = process.env.PORT || 8080;

function keepAlive(url) {
  const client = url.startsWith('https') ? https : http;
  client.get(url, (res) => {
    console.log(`[keep-alive] ping ${url} → ${res.statusCode}`);
  }).on('error', (err) => {
    console.warn(`[keep-alive] ping failed: ${err.message}`);
  });
}

// Portni darhol ochamiz — Render port scan qilgunga qadar tayyor bo'ladi
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);

  const selfUrl = process.env.RENDER_EXTERNAL_URL
    ? `${process.env.RENDER_EXTERNAL_URL}/api/health`
    : `http://localhost:${PORT}/api/health`;

  setInterval(() => keepAlive(selfUrl), 10_000);

  // DB ga ulanishni fon rejimda tekshiramiz
  pool.query('SELECT 1')
    .then(() => console.log('NeonDB connected'))
    .catch(err => console.error('NeonDB connection error:', err.message));
});
