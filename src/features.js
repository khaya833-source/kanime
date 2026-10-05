/**
 * KAnime Advanced Features Module
 * Includes: Watch Party, Auto-Skip, Watchlists, Hover Previews, Random Anime,
 * Anime Calendar, Episode Progress Tracking
 */

// ============================================================================
// 1. WATCHLIST & FAVORITING SYSTEM
// ============================================================================

export class WatchlistManager {
  constructor() {
    this.storageKey = "kanime_watchlist";
    this.watchlist = this.loadWatchlist();
  }

  loadWatchlist() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : { watching: [], planToWatch: [], completed: [], dropped: [] };
  }

  saveWatchlist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.watchlist));
  }

  addToList(animeId, status) {
    // status: "watching", "planToWatch", "completed", "dropped"
    if (!this.watchlist[status]) return false;

    // Remove from other lists first
    Object.keys(this.watchlist).forEach(list => {
      this.watchlist[list] = this.watchlist[list].filter(id => id !== animeId);
    });

    // Add to target list
    if (!this.watchlist[status].includes(animeId)) {
      this.watchlist[status].push(animeId);
      this.saveWatchlist();
      return true;
    }
    return false;
  }

  removeFromList(animeId) {
    Object.keys(this.watchlist).forEach(list => {
      this.watchlist[list] = this.watchlist[list].filter(id => id !== animeId);
    });
    this.saveWatchlist();
  }

  getStatus(animeId) {
    for (const [status, list] of Object.entries(this.watchlist)) {
      if (list.includes(animeId)) return status;
    }
    return null;
  }

  getList(status) {
    return this.watchlist[status] || [];
  }

  getAllWatchlist() {
    return this.watchlist;
  }
}

// ============================================================================
// 2. EPISODE PROGRESS TRACKER
// ============================================================================

export class EpisodeProgressTracker {
  constructor() {
    this.storageKey = "kanime_episode_progress";
    this.progress = this.loadProgress();
  }

  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {};
  }

  saveProgress() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
  }

  saveTimestamp(episodeId, currentTime, duration) {
    if (!this.progress[episodeId]) {
      this.progress[episodeId] = {};
    }
    this.progress[episodeId] = {
      currentTime: Math.round(currentTime),
      duration: Math.round(duration),
      percentage: Math.round((currentTime / duration) * 100),
      lastUpdated: new Date().toISOString()
    };
    this.saveProgress();
  }

  getTimestamp(episodeId) {
    return this.progress[episodeId] || null;
  }

  resumeEpisode(episodeId) {
    const data = this.progress[episodeId];
    return data ? data.currentTime : 0;
  }

  markAsWatched(episodeId, duration) {
    this.saveTimestamp(episodeId, duration, duration);
  }

  clearProgress(episodeId) {
    delete this.progress[episodeId];
    this.saveProgress();
  }

  getWatchedPercentage(episodeId) {
    const data = this.progress[episodeId];
    return data ? data.percentage : 0;
  }
}

// ============================================================================
// 3. AUTO-SKIP INTRO & OUTRO
// ============================================================================

export class AutoSkipManager {
  constructor(videoElement) {
    this.video = videoElement;
    this.storageKey = "kanime_skip_settings";
    this.settings = this.loadSettings();
    this.skipped = { intro: false, outro: false };
  }

  loadSettings() {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {
      autoSkipIntro: true,
      autoSkipOutro: true,
      skipNotification: true
    };
  }

  saveSettings() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
  }

  /**
   * Set intro/outro timestamps for an episode
   * @param {number} introStart - Intro start time in seconds
   * @param {number} introEnd - Intro end time in seconds
   * @param {number} outroStart - Outro start time in seconds
   * @param {number} outroEnd - Outro end time in seconds
   */
  setTimestamps(introStart, introEnd, outroStart, outroEnd) {
    this.timestamps = { introStart, introEnd, outroStart, outroEnd };
    this.attachSkipListeners();
  }

  attachSkipListeners() {
    if (!this.video) return;

    this.video.addEventListener("timeupdate", () => {
      const currentTime = this.video.currentTime;

      // Auto-skip intro
      if (
        this.settings.autoSkipIntro &&
        !this.skipped.intro &&
        currentTime >= this.timestamps.introStart &&
        currentTime < this.timestamps.introEnd
      ) {
        this.video.currentTime = this.timestamps.introEnd;
        this.skipped.intro = true;
        this.showSkipNotification("Intro skipped");
      }

      // Auto-skip outro
      if (
        this.settings.autoSkipOutro &&
        !this.skipped.outro &&
        currentTime >= this.timestamps.outroStart &&
        currentTime < this.timestamps.outroEnd
      ) {
        this.video.currentTime = this.timestamps.outroEnd;
        this.skipped.outro = true;
        this.showSkipNotification("Outro skipped");
      }
    });
  }

  showSkipNotification(message) {
    if (this.settings.skipNotification) {
      const notification = document.createElement("div");
      notification.className = "skip-notification";
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    }
  }

  toggleAutoSkip(type) {
    if (type === "intro") this.settings.autoSkipIntro = !this.settings.autoSkipIntro;
    if (type === "outro") this.settings.autoSkipOutro = !this.settings.autoSkipOutro;
    this.saveSettings();
  }

  resetSkipped() {
    this.skipped = { intro: false, outro: false };
  }
}

// ============================================================================
// 4. RANDOM ANIME PICKER
// ============================================================================

export class RandomAnimePicker {
  /**
   * Pick a random anime from a list
   * @param {Array} animeList - Array of anime objects
   * @param {string} filter - Filter by: "all", "trending", "highest-rated", "airing"
   */
  static pickRandom(animeList, filter = "all") {
    let filtered = animeList;

    if (filter === "trending") {
      filtered = animeList.sort((a, b) => a.trendingRank - b.trendingRank).slice(0, 20);
    } else if (filter === "highest-rated") {
      filtered = animeList.sort((a, b) => b.rating - a.rating).slice(0, 20);
    } else if (filter === "airing") {
      filtered = animeList.filter(a => a.status === "airing");
    }

    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  /**
   * Get a random "hidden gem" (older, highly-rated anime)
   */
  static pickHiddenGem(animeList) {
    const gems = animeList
      .filter(a => a.year < new Date().getFullYear() - 2 && a.rating >= 8.0)
      .sort((a, b) => b.rating - a.rating);

    if (gems.length === 0) return null;
    return gems[Math.floor(Math.random() * gems.length)];
  }
}

// ============================================================================
// 5. ANIME CALENDAR & COUNTDOWN
// ============================================================================

export class AnimeCalendar {
  constructor(animeList) {
    this.animeList = animeList;
  }

  /**
   * Get upcoming episodes grouped by day
   */
  getUpcomingEpisodes() {
    const today = new Date();
    const upcoming = {};
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    this.animeList
      .filter(a => a.status === "airing" && a.nextAirDate)
      .forEach(anime => {
        const airDate = new Date(anime.nextAirDate);
        const dayName = daysOfWeek[airDate.getDay()];
        const dateKey = airDate.toISOString().split("T")[0];

        if (!upcoming[dateKey]) {
          upcoming[dateKey] = {
            date: airDate,
            dayName,
            episodes: []
          };
        }

        upcoming[dateKey].episodes.push({
          animeTitle: anime.title,
          animeId: anime.id,
          episodeNumber: anime.currentEpisode + 1,
          airingTime: anime.airingTime
        });
      });

    return upcoming;
  }

  /**
   * Calculate countdown to next episode
   */
  getCountdown(nextAirDate) {
    const now = new Date();
    const air = new Date(nextAirDate);
    const diff = air - now;

    if (diff <= 0) return "Airing now!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  }

  /**
   * Get live countdown updates (updates every minute)
   */
  startLiveCountdown(elementId, nextAirDate, callback) {
    const updateCountdown = () => {
      const countdown = this.getCountdown(nextAirDate);
      const element = document.getElementById(elementId);
      if (element) element.textContent = countdown;
      if (callback) callback(countdown);
    };

    updateCountdown();
    return setInterval(updateCountdown, 60000); // Update every minute
  }
}

// ============================================================================
// 6. INTERACTIVE HOVER PREVIEW
// ============================================================================

export class HoverPreview {
  /**
   * Create a hover preview on an anime card
   * @param {HTMLElement} cardElement - The anime card DOM element
   * @param {Object} anime - Anime object with preview data
   * @param {string} previewType - "video", "gif", or "slideshow"
   */
  static attachPreview(cardElement, anime, previewType = "video") {
    if (!cardElement) return;

    const previewContainer = document.createElement("div");
    previewContainer.className = "hover-preview";
    previewContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      border-radius: 20px;
      display: none;
      z-index: 100;
      overflow: hidden;
    `;

    if (previewType === "video") {
      previewContainer.innerHTML = `
        <video
          style="width: 100%; height: 100%; object-fit: cover;"
          autoplay
          muted
          loop
          src="${anime.trailerUrl || ''}"
        ></video>
      `;
    } else if (previewType === "gif") {
      previewContainer.innerHTML = `
        <img
          style="width: 100%; height: 100%; object-fit: cover;"
          src="${anime.coverImage}"
          alt="${anime.title}"
        />
      `;
    }

    const infoOverlay = document.createElement("div");
    infoOverlay.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.9));
      padding: 20px;
      color: white;
    `;
    infoOverlay.innerHTML = `
      <h4 style="margin: 0 0 8px; font-size: 1.1rem;">${anime.title}</h4>
      <p style="margin: 0 0 12px; font-size: 0.9rem; color: #aaa; line-height: 1.5;">
        ${anime.synopsis || anime.description}
      </p>
      <div style="display: flex; gap: 12px; font-size: 0.85rem;">
        <span>⭐ ${anime.rating}/10</span>
        <span>${anime.status}</span>
        <span>${anime.year}</span>
      </div>
    `;

    previewContainer.appendChild(infoOverlay);
    cardElement.style.position = "relative";
    cardElement.appendChild(previewContainer);

    // Attach hover listeners
    cardElement.addEventListener("mouseenter", () => {
      previewContainer.style.display = "block";
    });

    cardElement.addEventListener("mouseleave", () => {
      previewContainer.style.display = "none";
    });
  }
}

// ============================================================================
// 7. WATCH PARTY / SYNC PLAY
// ============================================================================

export class WatchParty {
  constructor(episodeId) {
    this.episodeId = episodeId;
    this.partyId = this.generatePartyId();
    this.participants = [];
    this.syncOffset = 0;
    this.isHost = false;
  }

  generatePartyId() {
    return `party_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create a shareable watch party link
   */
  generateShareLink() {
    const baseUrl = window.location.origin;
    return `${baseUrl}?watch-party=${this.partyId}&episode=${this.episodeId}`;
  }

  /**
   * Copy link to clipboard
   */
  copyShareLink() {
    const link = this.generateShareLink();
    navigator.clipboard.writeText(link).then(() => {
      console.log("Watch party link copied!");
      return true;
    });
  }

  /**
   * Sync playback across all participants
   * This would connect via WebSocket in a real application
   */
  syncPlayback(videoElement, isHost = false) {
    this.isHost = isHost;

    if (isHost) {
      // Host sends updates
      videoElement.addEventListener("play", () => {
        this.broadcastEvent("play", { time: videoElement.currentTime });
      });

      videoElement.addEventListener("pause", () => {
        this.broadcastEvent("pause", { time: videoElement.currentTime });
      });

      videoElement.addEventListener("seek", () => {
        this.broadcastEvent("seek", { time: videoElement.currentTime });
      });
    } else {
      // Guest receives updates and syncs
      this.onEvent("play", (data) => {
        if (Math.abs(videoElement.currentTime - data.time) > 0.5) {
          videoElement.currentTime = data.time;
        }
        videoElement.play();
      });

      this.onEvent("pause", (data) => {
        videoElement.pause();
      });

      this.onEvent("seek", (data) => {
        videoElement.currentTime = data.time;
      });
    }
  }

  /**
   * Broadcast event to all participants
   * In a real app, use WebSocket: ws.send(JSON.stringify(event))
   */
  broadcastEvent(eventType, data) {
    const event = {
      partyId: this.partyId,
      type: eventType,
      data: data,
      timestamp: Date.now()
    };
    console.log("Broadcasting event:", event);
    // WebSocket send would go here
  }

  /**
   * Listen for events from other participants
   * In a real app, this would receive from WebSocket
   */
  onEvent(eventType, callback) {
    // WebSocket listener would go here
    console.log(`Listening for ${eventType} events`);
  }

  /**
   * Add participant to watch party
   */
  addParticipant(userId, username) {
    this.participants.push({
      id: userId,
      name: username,
      joinedAt: new Date().toISOString(),
      syncStatus: "synced"
    });
  }

  /**
   * Send live chat message
   */
  sendChatMessage(username, message) {
    return {
      id: `msg_${Date.now()}`,
      username,
      message,
      timestamp: new Date().toISOString()
    };
  }

  getPartyInfo() {
    return {
      partyId: this.partyId,
      episodeId: this.episodeId,
      isHost: this.isHost,
      participantCount: this.participants.length,
      participants: this.participants,
      shareLink: this.generateShareLink()
    };
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*

// 1. Watchlist
const watchlist = new WatchlistManager();
watchlist.addToList(1, "watching"); // Add anime 1 to "watching"
console.log(watchlist.getStatus(1)); // "watching"

// 2. Episode Progress
const progressTracker = new EpisodeProgressTracker();
progressTracker.saveTimestamp(1001, 123, 1440); // Save at 123s out of 1440s
console.log(progressTracker.getWatchedPercentage(1001)); // 8%

// 3. Auto-Skip
const video = document.getElementById("video-player");
const autoSkip = new AutoSkipManager(video);
autoSkip.setTimestamps(90, 130, 1350, 1440); // Intro: 90-130s, Outro: 1350-1440s
autoSkip.toggleAutoSkip("intro");

// 4. Random Anime
const random = RandomAnimePicker.pickRandom(animeList, "trending");
const gem = RandomAnimePicker.pickHiddenGem(animeList);

// 5. Calendar & Countdown
const calendar = new AnimeCalendar(animeList);
const upcoming = calendar.getUpcomingEpisodes();
calendar.startLiveCountdown("countdown-timer", "2024-01-21T22:00:00");

// 6. Hover Preview
const card = document.querySelector(".anime-card");
HoverPreview.attachPreview(card, anime, "video");

// 7. Watch Party
const party = new WatchParty(1001);
const shareLink = party.generateShareLink();
party.copyShareLink();
party.syncPlayback(video, true); // true = host

*/
