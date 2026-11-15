import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

const COURSES = [
  { id: 1, title: 'Web programming', credits: 6 },
  { id: 2, title: 'Databases', credits: 5 },
  { id: 3, title: 'Algorithms', credits: 6 },
];

let requestCount = 0;

function requestLogger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
}

function requestCounter(req, res, next) {
  requestCount++;
  next();
}

app.use(requestLogger);
app.use(requestCounter);

app.get('/hello', (req, res) => {
  res.type('text/plain');
  res.send("Hello from Emre's server");
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /api/');
});

app.get('/old-page', (req, res) => {
  res.redirect('/hello');
});

app.get('/api/courses', (req, res) => {
  res.json(COURSES);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    nodeVersion: process.version,
    uptimeSeconds: Math.round(process.uptime()),
  });
});

app.get('/api/headers', (req, res) => {
  res.json({
    'user-agent': req.get('User-Agent'),
    accept: req.get('Accept'),
  });
});

app.post('/api/subscribe', (req, res) => {
  res.status(201).json({ subscribed: true });
});

app.get('/api/admin', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/api/stats', (req, res) => {
  res.json({ requestsServed: requestCount });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});