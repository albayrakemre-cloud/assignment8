import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

const COURSES = [
  { id: 1, title: 'Web Development', credits: 6 },
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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});