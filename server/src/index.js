require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const pool = require('./db');

const { getPackages, createPackage } = require('./controllers/packagesController');
const { getBookings, createBooking, updateBooking } = require('./controllers/bookingsController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/packages', getPackages);
app.post('/api/packages', createPackage);

app.get('/api/bookings', getBookings);
app.post('/api/bookings', createBooking);
app.put('/api/bookings/:id', updateBooking);

const port = process.env.PORT || 8080;

function keepAlive(url) {
  const client = url.startsWith('https') ? https : http;
  client.get(url, (res) => {
    console.log(`[keep-alive] ping ${url} → ${res.statusCode}`);
  }).on('error', (err) => {
    console.warn(`[keep-alive] ping failed: ${err.message}`);
  });
}

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('NeonDB connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);

      const selfUrl = process.env.RENDER_EXTERNAL_URL
        ? `${process.env.RENDER_EXTERNAL_URL}/api/health`
        : `http://localhost:${port}/api/health`;

      setInterval(() => keepAlive(selfUrl), 10_000);
      console.log(`[keep-alive] pinging ${selfUrl} every 10s`);
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
}

start();
