/**
 * Mock anime data for development and testing
 * This simulates fetching data from a real API like AniList, MyAnimeList, or Jikan
 */

export const animeData = {
  featured: {
    id: 1,
    title: "Solo Leveling",
    slug: "solo-leveling",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    description: "An unpromising boy grapples with unrealistic dreams, only to find his entire life fundamentally altered by a miraculous incident.",
    synopsis: "Sung Jinwoo was a low-rank hunter in a world of gifted hunters. Until one day, he miraculously survived a terrible dungeon raid with a skill called 'System'. With this mysterious power, Sung Jinwoo set out to become the world's strongest hunter, often referred to as the 'Sung Jinwoo of the world.'",
    rating: 8.5,
    score: 4.9,
    totalRating: 52847,
    episodes: 12,
    currentEpisode: 2,
    status: "airing", // airing, completed, upcoming
    contentRating: "16+", // 13+, 16+, 18+
    season: "Winter",
    year: 2024,
    releaseDate: "2024-01-07",
    endDate: null,
    airingDay: "Sunday",
    airingTime: "22:00",
    duration: 24, // minutes per episode
    source: "Web Novel",
    studio: "A-1 Pictures",
    productionCompanies: ["A-1 Pictures", "Crunchyroll"],
    genres: ["Action", "Fantasy", "Adventure"],
    audioTypes: ["Subbed", "Dubbed"],
    trailerUrl: "https://www.youtube.com/embed/pKGXf_mZXL0",
    trendingRank: 1,
    popularityRank: 2,
    nextAirDate: "2024-01-14"
  },

  trending: [
    {
      id: 2,
      title: "Jujutsu Kaisen",
      slug: "jujutsu-kaisen",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=500&q=80",
      description: "A high schooler enters a world of jujutsu sorcery when a cursed object gets near him.",
      synopsis: "Yuji Itadori, a high schooler with a passion for helping others, ends up swallowing a cursed finger and becomes the vessel for a powerful curse.",
      rating: 8.7,
      score: 4.8,
      totalRating: 48923,
      episodes: 24,
      currentEpisode: 24,
      status: "completed",
      contentRating: "16+",
      year: 2020,
      studio: "MAPPA",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Action", "Supernatural"],
      trendingRank: 2,
      popularityRank: 1,
      badge: "New"
    },
    {
      id: 3,
      title: "Attack on Titan",
      slug: "attack-on-titan",
      coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=500&q=80",
      description: "Humanity fights for survival against giant humanoid creatures known as Titans.",
      synopsis: "In a world where humanity lives behind massive walls to protect themselves from giant humanoid creatures known as Titans, the Survey Corps fights back.",
      rating: 8.9,
      score: 4.7,
      totalRating: 65432,
      episodes: 87,
      currentEpisode: 87,
      status: "completed",
      contentRating: "18+",
      year: 2013,
      studio: "Wit Studio, MAPPA",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Action", "Drama"],
      trendingRank: 3,
      popularityRank: 3,
      badge: "Popular"
    },
    {
      id: 4,
      title: "Demon Slayer",
      slug: "demon-slayer",
      coverImage: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=500&q=80",
      description: "A young man joins a demon-slaying corps to save his sister from a demon curse.",
      synopsis: "After his family is slaughtered by demons, Tanjiro enters the Demon Slayer Corps to find a cure for his sister's demonic transformation.",
      rating: 8.8,
      score: 4.9,
      totalRating: 55678,
      episodes: 44,
      currentEpisode: 44,
      status: "airing",
      contentRating: "16+",
      year: 2019,
      studio: "Ufotable",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Action", "Fantasy"],
      trendingRank: 1,
      popularityRank: 4,
      badge: "Top Rated"
    },
    {
      id: 5,
      title: "Spy x Family",
      slug: "spy-x-family",
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80",
      description: "A spy, an assassin, and a telepath form an unlikely family.",
      synopsis: "A spy, an assassin, and a telepath unknowingly form a family to help each other accomplish their secret missions.",
      rating: 8.6,
      score: 4.8,
      totalRating: 42156,
      episodes: 25,
      currentEpisode: 25,
      status: "completed",
      contentRating: "13+",
      year: 2022,
      studio: "Cloverworks, CloverWorks",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Comedy", "Action"],
      trendingRank: 4,
      popularityRank: 5,
      badge: "Trending"
    },
    {
      id: 6,
      title: "My Hero Academia",
      slug: "my-hero-academia",
      coverImage: "https://images.unsplash.com/photo-1517604931442-7e0c6e4c9a83?auto=format&fit=crop&w=500&q=80",
      description: "A quirkless boy dreams of becoming a hero in a world of superpowers.",
      synopsis: "In a world where 80% of humanity has superpowers called Quirks, Deku, a quirkless boy, dreams of becoming a hero and attends a prestigious hero academy.",
      rating: 8.0,
      score: 4.6,
      totalRating: 71234,
      episodes: 113,
      currentEpisode: 113,
      status: "airing",
      contentRating: "13+",
      year: 2016,
      studio: "Bones",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Action", "School"],
      trendingRank: 5,
      popularityRank: 2,
      badge: "Popular"
    },
    {
      id: 7,
      title: "Chainsaw Man",
      slug: "chainsaw-man",
      coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80",
      description: "A man fused with a chainsaw devil hunts demons for the devil-hunting organization.",
      synopsis: "Denji, a young man who becomes a man-devil hybrid after merging with Pochita, works as a devil hunter for an organization while seeking love and simple pleasures.",
      rating: 8.4,
      score: 4.7,
      totalRating: 38945,
      episodes: 12,
      currentEpisode: 12,
      status: "completed",
      contentRating: "18+",
      year: 2022,
      studio: "MAPPA",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Action", "Dark"],
      trendingRank: 2,
      popularityRank: 6,
      badge: "New"
    },
    {
      id: 8,
      title: "Steins;Gate",
      slug: "steins-gate",
      coverImage: "https://images.unsplash.com/photo-1535016120754-fd45c1d54fce?auto=format&fit=crop&w=500&q=80",
      description: "A group discovers their microwave can send messages to the past, altering the timeline.",
      synopsis: "A group of friends discovers their modified microwave can send text messages to the past, leading them into a complex web of time travel conspiracies.",
      rating: 9.1,
      score: 4.9,
      totalRating: 72891,
      episodes: 24,
      currentEpisode: 24,
      status: "completed",
      contentRating: "16+",
      year: 2011,
      studio: "White Fox",
      audioTypes: ["Subbed", "Dubbed"],
      genres: ["Sci-Fi", "Thriller"],
      trendingRank: 6,
      popularityRank: 7,
      badge: "Masterpiece"
    }
  ],

  details: {
    id: 1,
    title: "Solo Leveling",
    alternativeTitle: "Sung Jinwoo",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    description: "In a world of gifted hunters and monsters, a low-ranking 'E-class' hunter named Sung Jinwoo finds himself in a mysterious situation after an incident in an instant dungeon. With a special ability awakened in him, he begins his rise to the top. Will he be able to survive in a world full of hunters?",
    longDescription: "Sung Jinwoo was a low-rank hunter in a world of gifted hunters. Until one day, he miraculously survived a terrible dungeon raid with a skill called 'System'. With this mysterious power, Sung Jinwoo set out to become the world's strongest hunter, often referred to as the 'Sung Jinwoo of the world.'",
    synopsis: "An unpromising boy grapples with unrealistic dreams, only to find his entire life fundamentally altered by a miraculous incident.",
    rating: 8.5,
    score: 4.9,
    totalRating: 52847,
    episodes: 12,
    currentEpisode: 2,
    status: "airing",
    contentRating: "16+",
    season: "Winter",
    year: 2024,
    releaseDate: "2024-01-07",
    endDate: null,
    airingDay: "Sunday",
    airingTime: "22:00",
    duration: 24,
    source: "Web Novel",
    studio: "A-1 Pictures",
    productionCompanies: ["A-1 Pictures", "Crunchyroll"],
    audioTypes: ["Subbed", "Dubbed"],
    trailerUrl: "https://www.youtube.com/embed/pKGXf_mZXL0",
    trendingRank: 1,
    popularityRank: 2,
    genres: ["Action", "Adventure", "Fantasy", "Power Up"],
    characters: [
      {
        id: 101,
        name: "Sung Jinwoo",
        role: "Protagonist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        voice: {
          korean: "Park Seo-jun",
          japanese: "Taito Ban"
        }
      },
      {
        id: 102,
        name: "Cha Hae-in",
        role: "Supporting",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        voice: {
          korean: "Lee Ju-mi",
          japanese: "Akari Takaishi"
        }
      }
    ],
    reviews: [
      {
        id: 1001,
        author: "AnimeFan92",
        rating: 5,
        content: "Absolutely amazing! Solo Leveling is everything I hoped for. The animation is stunning!",
        date: "2024-01-15",
        helpful: 234
      },
      {
        id: 1002,
        author: "ManwaReader",
        rating: 4,
        content: "Great adaptation so far, though some scenes feel rushed compared to the source material.",
        date: "2024-01-14",
        helpful: 156
      },
      {
        id: 1003,
        author: "TokyoDreams",
        rating: 5,
        content: "The character development and action sequences are top-notch. Highly recommended!",
        date: "2024-01-13",
        helpful: 289
      }
    ]
  },

  episodes: [
    {
      id: 1001,
      episodeNumber: 1,
      title: "Awakening",
      description: "Sung Jinwoo, an E-rank hunter known as the 'World's Weakest', experiences a strange phenomenon...",
      airDate: "2024-01-07",
      duration: 24,
      thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80",
      videoSources: {
        subbed: {
          "1080p": "https://example.com/solo-leveling-ep1-sub-1080p.mp4",
          "720p": "https://example.com/solo-leveling-ep1-sub-720p.mp4",
          "480p": "https://example.com/solo-leveling-ep1-sub-480p.mp4",
          "m3u8": "https://example.com/solo-leveling-ep1-sub/playlist.m3u8"
        },
        dubbed: {
          "1080p": "https://example.com/solo-leveling-ep1-dub-1080p.mp4",
          "720p": "https://example.com/solo-leveling-ep1-dub-720p.mp4",
          "480p": "https://example.com/solo-leveling-ep1-dub-480p.mp4",
          "m3u8": "https://example.com/solo-leveling-ep1-dub/playlist.m3u8"
        }
      },
      watched: false,
      watchedProgress: 0 // percentage 0-100
    },
    {
      id: 1002,
      episodeNumber: 2,
      title: "Arise",
      description: "Jinwoo's mysterious powers begin to manifest as he participates in his first dungeon raid...",
      airDate: "2024-01-14",
      duration: 24,
      thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80",
      videoSources: {
        subbed: {
          "1080p": "https://example.com/solo-leveling-ep2-sub-1080p.mp4",
          "720p": "https://example.com/solo-leveling-ep2-sub-720p.mp4",
          "480p": "https://example.com/solo-leveling-ep2-sub-480p.mp4",
          "m3u8": "https://example.com/solo-leveling-ep2-sub/playlist.m3u8"
        },
        dubbed: {
          "1080p": "https://example.com/solo-leveling-ep2-dub-1080p.mp4",
          "720p": "https://example.com/solo-leveling-ep2-dub-720p.mp4",
          "480p": "https://example.com/solo-leveling-ep2-dub-480p.mp4",
          "m3u8": "https://example.com/solo-leveling-ep2-dub/playlist.m3u8"
        }
      },
      watched: true,
      watchedProgress: 100
    },
    {
      id: 1003,
      episodeNumber: 3,
      title: "The System",
      description: "With newfound power, Jinwoo begins to understand the nature of his mysterious ability...",
      airDate: "2024-01-21",
      duration: 24,
      thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=500&q=80",
      videoSources: {
        subbed: {
          "1080p": "https://example.com/solo-leveling-ep3-sub-1080p.mp4",
          "720p": "https://example.com/solo-leveling-ep3-sub-720p.mp4",
          "480p": "https://example.com/solo-leveling-ep3-sub-480p.mp4",
          "m3u8": "https://example.com/solo-leveling-ep3-sub/playlist.m3u8"
        },
        dubbed: {
          "1080p": "https://example.com/solo-leveling-ep3-dub-1080p.mp4",
          "720p": "https://example.com/solo-leveling-ep3-dub-720p.mp4",
          "480p": "https://example.com/solo-leveling-ep3-dub-480p.mp4",
          "m3u8": "https://example.com/solo-leveling-ep3-dub/playlist.m3u8"
        }
      },
      watched: false,
      watchedProgress: 0
    }
  ],

  categories: [
    { id: 1, name: "All", slug: "all" },
    { id: 2, name: "Action", slug: "action" },
    { id: 3, name: "Fantasy", slug: "fantasy" },
    { id: 4, name: "Romance", slug: "romance" },
    { id: 5, name: "Sci-Fi", slug: "sci-fi" },
    { id: 6, name: "Comedy", slug: "comedy" },
    { id: 7, name: "Drama", slug: "drama" },
    { id: 8, name: "Supernatural", slug: "supernatural" }
  ],

  contentRatings: [
    { code: "13+", label: "13 and above" },
    { code: "16+", label: "16 and above" },
    { code: "18+", label: "18 and above" }
  ]
};

/**
 * Mock API functions to simulate fetching data
 * These can be easily replaced with real API calls later
 */

export const mockAPI = {
  // Simulate API delay
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Fetch featured anime
  async getFeaturedAnime() {
    await this.delay();
    return animeData.featured;
  },

  // Fetch trending anime
  async getTrendingAnime(limit = 8, sortBy = "trending") {
    await this.delay();
    const sorted = [...animeData.trending].sort((a, b) => {
      if (sortBy === "trending") return a.trendingRank - b.trendingRank;
      if (sortBy === "popularity") return a.popularityRank - b.popularityRank;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
    return sorted.slice(0, limit);
  },

  // Fetch anime details by ID
  async getAnimeDetails(id) {
    await this.delay();
    if (id === 1) return animeData.details;
    throw new Error(`Anime with ID ${id} not found`);
  },

  // Fetch episodes for an anime
  async getEpisodes(animeId) {
    await this.delay();
    return animeData.episodes;
  },

  // Fetch a specific episode
  async getEpisode(episodeId) {
    await this.delay();
    const episode = animeData.episodes.find(ep => ep.id === episodeId);
    if (episode) return episode;
    throw new Error(`Episode with ID ${episodeId} not found`);
  },

  // Fetch categories
  async getCategories() {
    await this.delay();
    return animeData.categories;
  },

  // Fetch content ratings
  async getContentRatings() {
    await this.delay();
    return animeData.contentRatings;
  },

  // Search anime
  async searchAnime(query) {
    await this.delay();
    const results = animeData.trending.filter(anime =>
      anime.title.toLowerCase().includes(query.toLowerCase())
    );
    return results;
  },

  // Filter anime by genre
  async filterByGenre(genre) {
    await this.delay();
    return animeData.trending.filter(anime =>
      anime.genres.includes(genre)
    );
  },

  // Filter anime by status
  async filterByStatus(status) {
    await this.delay();
    return animeData.trending.filter(anime => anime.status === status);
  },

  // Filter anime by content rating
  async filterByContentRating(rating) {
    await this.delay();
    return animeData.trending.filter(anime => anime.contentRating === rating);
  },

  // Filter anime by year
  async filterByYear(year) {
    await this.delay();
    return animeData.trending.filter(anime => anime.year === year);
  },

  // Get trending ranked anime
  async getTrendingRanked() {
    await this.delay();
    return animeData.trending.sort((a, b) => a.trendingRank - b.trendingRank);
  },

  // Get most popular anime
  async getMostPopular() {
    await this.delay();
    return animeData.trending.sort((a, b) => a.popularityRank - b.popularityRank);
  },

  // Get highest rated anime
  async getHighestRated() {
    await this.delay();
    return animeData.trending.sort((a, b) => b.rating - a.rating);
  },

  // Mark episode as watched
  async markEpisodeAsWatched(episodeId, progress = 100) {
    await this.delay();
    const episode = animeData.episodes.find(ep => ep.id === episodeId);
    if (episode) {
      episode.watched = progress === 100;
      episode.watchedProgress = progress;
      return { success: true, message: "Episode progress updated" };
    }
    throw new Error("Episode not found");
  },

  // Get video sources for episode
  async getVideoSources(episodeId, audioType = "subbed") {
    await this.delay();
    const episode = animeData.episodes.find(ep => ep.id === episodeId);
    if (episode) {
      return episode.videoSources[audioType] || {};
    }
    throw new Error("Episode not found");
  }
};

/**
 * Example usage:
 * 
 * const featured = await mockAPI.getFeaturedAnime();
 * console.log(featured);
 * 
 * const trending = await mockAPI.getTrendingAnime();
 * console.log(trending);
 * 
 * const details = await mockAPI.getAnimeDetails(1);
 * console.log(details);
 * 
 * const episodes = await mockAPI.getEpisodes(1);
 * console.log(episodes);
 * 
 * const sources = await mockAPI.getVideoSources(1001, "subbed");
 * console.log(sources);
 * 
 * const filtered = await mockAPI.filterByContentRating("16+");
 * console.log(filtered);
 */
