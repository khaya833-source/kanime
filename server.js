const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'kanime-dev-secret';

const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const uploadsDir = path.join(rootDir, 'uploads');

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadsDir, { recursive: true });

const animeFile = path.join(dataDir, 'anime.json');
const usersFile = path.join(dataDir, 'users.json');
const watchlistFile = path.join(dataDir, 'watchlist.json');
const uploadedSeriesFile = path.join(dataDir, 'uploadedSeries.json');

function seedAnime() {
  return [
    {
      id: 1,
      title: 'Solo Leveling',
      genres: ['Action', 'Fantasy'],
      year: 2024,
      score: 8.8,
      episodes: 12,
      status: 'Airing',
      description: 'A hidden hunter awakens to a mysterious system and enters a world where power is everything.',
      coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      currentEpisode: 2
    },
    {
      id: 2,
      title: 'Jujutsu Kaisen',
      genres: ['Action', 'Fantasy'],
      year: 2023,
      score: 9.1,
      episodes: 24,
      status: 'Airing',
      description: 'Students and sorcerers battle cursed spirits in a brutal struggle for survival.',
      coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      currentEpisode: 3
    },
    {
      id: 3,
      title: 'Demon Slayer',
      genres: ['Fantasy', 'Adventure'],
      year: 2022,
      score: 9.3,
      episodes: 24,
      status: 'Completed',
      description: 'A swordsman fights demons while protecting his family and seeking a cure for his sister.',
      coverImage: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      currentEpisode: 4
    },
    {
      id: 4,
      title: 'Spy x Family',
      genres: ['Comedy', 'Action'],
      year: 2024,
      score: 8.6,
      episodes: 25,
      status: 'Airing',
      description: 'A fake family of spies, assassins, and telepaths navigates the chaos of everyday life.',
      coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      currentEpisode: 5
    },
    {
      id: 5,
      title: 'Attack on Titan',
      genres: ['Action', 'Drama'],
      year: 2021,
      score: 9.4,
      episodes: 87,
      status: 'Completed',
      description: 'Humanity lives behind walls while titans threaten their final hope for survival.',
      coverImage: 'https://images.unsplash.com/photo-1534511902677-0b2c0a0f1d5f?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      currentEpisode: 6
    },
    {
      id: 6,
      title: 'One Punch Man',
      genres: ['Action', 'Comedy'],
      year: 2023,
      score: 8.7,
      episodes: 12,
      status: 'Airing',
      description: 'The strongest hero in the world is bored by constant victories and seeks a worthy challenge.',
      coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      currentEpisode: 7
    }
  ];
}

function readJSON(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    if (!raw.trim()) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function ensureSeedFiles() {
  const animeData = readJSON(animeFile, seedAnime());
  if (!Array.isArray(animeData) || animeData.length === 0) {
    writeJSON(animeFile, seedAnime());
  }
  readJSON(usersFile, []);
  readJSON(watchlistFile, []);
  readJSON(uploadedSeriesFile, []);
}

ensureSeedFiles();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.bin';
    const safeName = `${Date.now()}-${Math.random().toString(16).slice(2)}${ext}`;
    cb(null, safeName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'kanime-api' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(rootDir, 'upload.html'));
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password, username } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const users = readJSON(usersFile, []);
  const alreadyExists = users.some((user) => user.email.toLowerCase() === String(email).toLowerCase());

  if (alreadyExists) {
    return res.status(409).json({ error: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    email: String(email).trim(),
    username: String(username || email.split('@')[0]).trim(),
    password: hashedPassword,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeJSON(usersFile, users);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, username: newUser.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const users = readJSON(usersFile, []);
  const matchedUser = users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());

  if (!matchedUser) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const passwordMatches = await bcrypt.compare(password, matchedUser.password);

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: matchedUser.id, email: matchedUser.email, username: matchedUser.username },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: matchedUser.id,
      email: matchedUser.email,
      username: matchedUser.username
    }
  });
});

app.get('/api/anime/top', (req, res) => {
  const anime = readJSON(animeFile, seedAnime());
  const page = Number(req.query.page || 1);
  const pageSize = 12;
  const startIndex = (page - 1) * pageSize;
  const items = anime.slice(startIndex, startIndex + pageSize);

  res.json({
    data: items,
    page,
    total: anime.length,
    pageSize
  });
});

app.get('/api/anime/search', (req, res) => {
  const query = String(req.query.q || '').trim().toLowerCase();
  const genre = String(req.query.genre || '').trim();
  const anime = readJSON(animeFile, seedAnime());

  let filtered = anime;

  if (query) {
    filtered = filtered.filter((item) => item.title.toLowerCase().includes(query));
  }

  if (genre) {
    filtered = filtered.filter((item) => (item.genres || []).includes(genre));
  }

  res.json({ data: filtered });
});

app.get('/api/anime/:id', (req, res) => {
  const anime = readJSON(animeFile, seedAnime());
  const found = anime.find((item) => Number(item.id) === Number(req.params.id));
  if (!found) {
    return res.status(404).json({ error: 'Anime not found.' });
  }
  res.json(found);
});

app.get('/api/watchlist', authMiddleware, (req, res) => {
  const allEntries = readJSON(watchlistFile, []);
  const entries = allEntries.filter((entry) => Number(entry.userId) === Number(req.user.id));
  res.json(entries.map((entry) => ({
    id: entry.id,
    anime_id: entry.anime_id,
    mal_id: entry.anime_id,
    title: entry.title,
    status: entry.status,
    addedAt: entry.addedAt
  })));
});

app.post('/api/watchlist', authMiddleware, (req, res) => {
  const { animeId, status = 'watching' } = req.body || {};
  if (!animeId) {
    return res.status(400).json({ error: 'animeId is required.' });
  }

  const animeList = readJSON(animeFile, seedAnime());
  const foundAnime = animeList.find((item) => Number(item.id) === Number(animeId));

  const watchlist = readJSON(watchlistFile, []);
  const existing = watchlist.find(
    (item) => Number(item.userId) === Number(req.user.id) && Number(item.anime_id) === Number(animeId)
  );

  if (existing) {
    existing.status = status;
    existing.updatedAt = new Date().toISOString();
    writeJSON(watchlistFile, watchlist);
    return res.json({
      id: existing.id,
      anime_id: existing.anime_id,
      title: existing.title,
      status: existing.status
    });
  }

  const nextEntry = {
    id: Date.now(),
    userId: req.user.id,
    anime_id: Number(animeId),
    title: foundAnime ? foundAnime.title : 'Anime',
    status,
    addedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  watchlist.push(nextEntry);
  writeJSON(watchlistFile, watchlist);

  res.status(201).json({
    id: nextEntry.id,
    anime_id: nextEntry.anime_id,
    title: nextEntry.title,
    status: nextEntry.status
  });
});

const uploadHandler = upload.array('episodes', 50);

app.post('/api/upload', authMiddleware, (req, res) => {
  uploadHandler(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed.' });
    }

    const title = String(req.body.title || '').trim();
    const genre = String(req.body.genre || '').trim();
    const year = String(req.body.year || new Date().getFullYear()).trim();
    const description = String(req.body.description || '').trim();
    const coverImage = String(req.body.coverImage || '').trim();

    if (!title) {
      return res.status(400).json({ error: 'Series title is required.' });
    }

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: 'At least one episode file is required.' });
    }

    const episodeList = files.map((file, index) => ({
      id: index + 1,
      fileName: file.originalname,
      storedPath: `/uploads/${file.filename}`,
      title: String(req.body[`episodeTitle_${index}`] || `Episode ${index + 1}`).trim(),
      size: file.size
    }));

    const allUploads = readJSON(uploadedSeriesFile, []);
    const seriesEntry = {
      id: Date.now(),
      title,
      genre,
      year,
      description,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80',
      uploadedBy: req.user.id,
      createdAt: new Date().toISOString(),
      episodes: episodeList
    };

    allUploads.unshift(seriesEntry);
    writeJSON(uploadedSeriesFile, allUploads);

    res.status(201).json({
      message: 'Series uploaded successfully.',
      series: seriesEntry
    });
  });
});

app.post('/api/ai/generate-titles', (req, res) => {
  const animeTitle = String(req.body.animeTitle || 'Anime').trim() || 'Anime';
  const episodeCount = Number(req.body.episodeCount || 1) || 1;
  const prompt = String(req.body.prompt || '').trim();

  const suggestions = Array.from({ length: episodeCount }, (_, index) => {
    const episodeNumber = index + 1;
    const base = `${animeTitle} - Episode ${episodeNumber}`;
    return {
      episode: episodeNumber,
      options: [
        `${base}: The Beginning`,
        `${base}: Awakening`,
        `${base}: Hidden Truth`,
        `${base}: New Resolve`,
        `${base}: ${prompt ? prompt.slice(0, 18) : 'Final Stand'}`
      ]
    };
  });

  res.json({ suggestions });
});

app.use(express.static(rootDir));

app.listen(PORT, () => {
  console.log(`\n✅ KAnime API running on http://localhost:${PORT}\n`);
  console.log('📚 Frontend: http://localhost:4000');
  console.log('📤 Upload page: http://localhost:4000/upload');
  console.log('🔌 API Health: http://localhost:4000/health\n');
});
