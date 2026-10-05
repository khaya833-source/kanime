# KAnime

A polished anime streaming-style website with working local backend APIs for auth, watchlists, uploads, and AI title generation.

## Features
- Responsive homepage and anime browsing UI
- Upload page for series and episodes
- Local auth with JWT
- Watchlist support
- Anime data API
- AI-style episode title generator
- Local JSON storage

## Setup

### Install dependencies
```bash
npm install
```

### Start the server
```bash
npm start
```

### Access the site
- Home: http://localhost:4000
- Upload: http://localhost:4000/upload
- API Health: http://localhost:4000/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Anime
- `GET /api/anime/top` - Get top anime with pagination
- `GET /api/anime/search` - Search anime by title or genre
- `GET /api/anime/:id` - Get anime details

### Watchlist (requires auth)
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add anime to watchlist

### Upload (requires auth)
- `POST /api/upload` - Upload series with episodes

### AI
- `POST /api/ai/generate-titles` - Generate episode titles

## Environment

Copy `.env.example` to `.env` and update values if needed.

## Notes

This project uses local JSON files for simple persistence and is ideal for local development and demos before connecting a real production database.
