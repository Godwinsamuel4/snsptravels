const serverless = require('serverless-http');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../../dist/public')));
app.use('/attached_assets', express.static(path.join(__dirname, '../../attached_assets')));

// Basic flight booking endpoint (simplified for serverless)
app.post('/api/flight-booking', (req, res) => {
  console.log('Booking received:', req.body);
  res.json({ success: true, message: 'Booking request received' });
});

// Catch all handler for SPA
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, '../../dist/public/index.html'));
  }
});

module.exports.handler = serverless(app);