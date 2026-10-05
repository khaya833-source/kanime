/**
 * KAnime AI Title Generator
 * Generates episode titles using AI with fallback templates
 */

// ============================================================================
// AI TITLE GENERATOR CLASS
// ============================================================================

export class AITitleGenerator {
  constructor(apiKey = null, model = "gpt-3.5-turbo") {
    this.apiKey = apiKey;
    this.model = model;
    this.provider = apiKey ? "openai" : "fallback";
    this.cacheKey = "kanime_generated_titles";
    this.cache = this.loadCache();
    this.settings = this.loadSettings();
  }

  loadCache() {
    const saved = localStorage.getItem(this.cacheKey);
    return saved ? JSON.parse(saved) : {};
  }

  saveCache() {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
  }

  loadSettings() {
    const saved = localStorage.getItem("kanime_ai_settings");
    return saved
      ? JSON.parse(saved)
      : {
          tone: "dramatic", // dramatic, humorous, mysterious, epic
          style: "descriptive", // descriptive, action-focused, emotional
          includeNumbers: true,
          maxLength: 50
        };
  }

  saveSettings() {
    localStorage.setItem("kanime_ai_settings", JSON.stringify(this.settings));
  }

  /**
   * Generate a single episode title
   */
  async generateTitle(animeTitle, episodeNumber, episodeSynopsis = null) {
    // Check cache first
    const cacheKey = `${animeTitle}_ep${episodeNumber}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    let title;

    if (this.provider === "openai" && this.apiKey) {
      title = await this.generateWithOpenAI(animeTitle, episodeNumber, episodeSynopsis);
    } else if (this.provider === "openai" && !this.apiKey) {
      console.warn("OpenAI API key not set, using fallback generator");
      title = this.generateWithTemplate(animeTitle, episodeNumber, episodeSynopsis);
    } else {
      title = this.generateWithTemplate(animeTitle, episodeNumber, episodeSynopsis);
    }

    // Cache the result
    this.cache[cacheKey] = title;
    this.saveCache();

    return title;
  }

  /**
   * Generate title using OpenAI API
   */
  async generateWithOpenAI(animeTitle, episodeNumber, episodeSynopsis) {
    try {
      const systemPrompt = `You are a creative anime episode title generator. Generate a compelling, concise episode title (max ${this.settings.maxLength} characters) in a ${this.settings.tone} tone and ${this.settings.style} style. Only return the title, nothing else.`;

      const userPrompt = episodeSynopsis
        ? `Generate an episode title for "${animeTitle}" Episode ${episodeNumber}. Synopsis: ${episodeSynopsis}`
        : `Generate an episode title for "${animeTitle}" Episode ${episodeNumber}.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 50,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      return this.generateWithTemplate(animeTitle, episodeNumber, episodeSynopsis);
    }
  }

  /**
   * Fallback template-based title generator
   */
  generateWithTemplate(animeTitle, episodeNumber, episodeSynopsis = null) {
    const templates = {
      dramatic: [
        `The Truth Revealed`,
        `Broken Bonds`,
        `Final Stand`,
        `Destiny Awaits`,
        `The Turning Point`,
        `Rise of the Champion`,
        `Shadows of Doubt`,
        `The Last Hope`,
        `Redemption's Call`,
        `A New Beginning`
      ],
      humorous: [
        `That's Ridiculous!`,
        `Wait, What?!`,
        `Plot Twist!`,
        `Who Knew?`,
        `Classic Blunder`,
        `The Unexpected Turn`,
        `Well, This Is Awkward`,
        `Not According to Plan`,
        `Comedy Gold`,
        `A Series of Events`
      ],
      mysterious: [
        `What Lies Beneath`,
        `Secrets Unveiled`,
        `The Hidden Truth`,
        `Unanswered Questions`,
        `Whispers in the Dark`,
        `The Forbidden Knowledge`,
        `Beyond the Veil`,
        `Mysteries Unfold`,
        `The Unknown Path`,
        `Shadows of the Past`
      ],
      epic: [
        `The Ultimate Battle`,
        `Legends Rise`,
        `Power Unleashed`,
        `The Final Clash`,
        `Crown of Victory`,
        `Destiny's Fury`,
        `The Apocalypse Begins`,
        `Rise of the Gods`,
        `The Age of Heroes`,
        `Infinity Awaits`
      ]
    };

    const episodeEmphasis = this.settings.includeNumbers ? ` - Episode ${episodeNumber}` : "";
    const toneTemplates = templates[this.settings.tone] || templates.dramatic;
    const randomTitle = toneTemplates[Math.floor(Math.random() * toneTemplates.length)];

    return `${randomTitle}${episodeEmphasis}`;
  }

  /**
   * Generate multiple title suggestions
   */
  async generateSuggestions(animeTitle, episodeNumber, count = 5, episodeSynopsis = null) {
    const suggestions = [];

    for (let i = 0; i < count; i++) {
      const title = await this.generateTitle(animeTitle, episodeNumber, episodeSynopsis);
      if (!suggestions.includes(title)) {
        suggestions.push(title);
      }
    }

    return suggestions.slice(0, count);
  }

  /**
   * Generate titles for multiple episodes
   */
  async generateBatch(animeTitle, startEpisode, endEpisode, episodeSynopsis = null) {
    const titles = {};

    for (let ep = startEpisode; ep <= endEpisode; ep++) {
      titles[ep] = await this.generateTitle(animeTitle, ep, episodeSynopsis);
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return titles;
  }

  /**
   * Update generator settings
   */
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache = {};
    localStorage.removeItem(this.cacheKey);
  }

  /**
   * Set API key and provider
   */
  setApiKey(apiKey, provider = "openai") {
    this.apiKey = apiKey;
    this.provider = provider;
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      cachedTitles: Object.keys(this.cache).length,
      cacheSize: new Blob([JSON.stringify(this.cache)]).size,
      cacheEntries: this.cache
    };
  }
}

// ============================================================================
// DOM INTEGRATION HELPERS
// ============================================================================

export class TitleGeneratorUI {
  constructor(generator) {
    this.generator = generator;
  }

  /**
   * Attach event listener to button
   */
  attachToButton(buttonId, animeInputId, episodeInputId, outputId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener("click", async () => {
      const animeTitle = document.getElementById(animeInputId)?.value || "Anime";
      const epNum = document.getElementById(episodeInputId)?.value || "1";
      const outputElement = document.getElementById(outputId);

      if (!outputElement) return;

      outputElement.value = "Generating title...";

      try {
        const title = await this.generator.generateTitle(animeTitle, epNum);
        outputElement.value = title;
      } catch (error) {
        console.error("Error generating title:", error);
        outputElement.value = "Error generating title";
      }
    });
  }

  /**
   * Show multiple suggestions in a modal/dropdown
   */
  showSuggestions(animeTitle, episodeNumber, containerId, count = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "<p>Loading suggestions...</p>";

    this.generator.generateSuggestions(animeTitle, episodeNumber, count).then(suggestions => {
      container.innerHTML = "";
      const list = document.createElement("ul");
      list.style.cssText = "list-style: none; padding: 0;";

      suggestions.forEach((title, index) => {
        const li = document.createElement("li");
        li.style.cssText = `
          padding: 12px;
          margin: 8px 0;
          background: rgba(124, 140, 255, 0.1);
          border: 1px solid rgba(124, 140, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        `;
        li.textContent = `${index + 1}. ${title}`;

        li.addEventListener("mouseover", () => {
          li.style.background = "rgba(124, 140, 255, 0.2)";
          li.style.borderColor = "rgba(124, 140, 255, 0.6)";
        });

        li.addEventListener("mouseout", () => {
          li.style.background = "rgba(124, 140, 255, 0.1)";
          li.style.borderColor = "rgba(124, 140, 255, 0.3)";
        });

        li.addEventListener("click", () => {
          const event = new CustomEvent("titleSelected", { detail: { title } });
          container.dispatchEvent(event);
        });

        list.appendChild(li);
      });

      container.appendChild(list);
    });
  }

  /**
   * Create a settings panel
   */
  createSettingsPanel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const panel = document.createElement("div");
    panel.style.cssText = `
      background: rgba(23, 31, 50, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
    `;

    panel.innerHTML = `
      <h3 style="margin-top: 0; color: #edf3ff;">Title Generator Settings</h3>
      
      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 8px; color: #9aa9c7;">
          Tone:
          <select id="toneSelect" style="margin-left: 10px; padding: 8px; border-radius: 6px;">
            <option value="dramatic">Dramatic</option>
            <option value="humorous">Humorous</option>
            <option value="mysterious">Mysterious</option>
            <option value="epic">Epic</option>
          </select>
        </label>
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 8px; color: #9aa9c7;">
          Style:
          <select id="styleSelect" style="margin-left: 10px; padding: 8px; border-radius: 6px;">
            <option value="descriptive">Descriptive</option>
            <option value="action-focused">Action-Focused</option>
            <option value="emotional">Emotional</option>
          </select>
        </label>
      </div>

      <div style="margin: 15px 0;">
        <label style="display: flex; align-items: center; color: #9aa9c7;">
          <input id="includeNumbersCheckbox" type="checkbox" checked style="margin-right: 10px;" />
          Include Episode Numbers
        </label>
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 8px; color: #9aa9c7;">
          Max Title Length:
          <input id="maxLengthInput" type="number" value="50" min="20" max="100" style="margin-left: 10px; padding: 8px; border-radius: 6px; width: 80px;" />
        </label>
      </div>

      <button id="saveTitleSettings" style="
        background: linear-gradient(135deg, #ff5a7d, #ff8d67);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
      ">Save Settings</button>
    `;

    container.appendChild(panel);

    // Load current settings
    document.getElementById("toneSelect").value = this.generator.settings.tone;
    document.getElementById("styleSelect").value = this.generator.settings.style;
    document.getElementById("includeNumbersCheckbox").checked = this.generator.settings.includeNumbers;
    document.getElementById("maxLengthInput").value = this.generator.settings.maxLength;

    // Save settings on button click
    document.getElementById("saveTitleSettings").addEventListener("click", () => {
      this.generator.updateSettings({
        tone: document.getElementById("toneSelect").value,
        style: document.getElementById("styleSelect").value,
        includeNumbers: document.getElementById("includeNumbersCheckbox").checked,
        maxLength: parseInt(document.getElementById("maxLengthInput").value)
      });
      alert("Settings saved!");
    });
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*

// 1. Initialize generator (without API key - uses fallback)
const generator = new AITitleGenerator();

// 2. Generate single title
const title = await generator.generateTitle("Solo Leveling", 5);
console.log(title); // e.g., "The Ultimate Power - Episode 5"

// 3. Update settings
generator.updateSettings({
  tone: "dramatic",
  style: "descriptive",
  includeNumbers: true,
  maxLength: 50
});

// 4. Generate suggestions
const suggestions = await generator.generateSuggestions("Demon Slayer", 10, 5);
console.log(suggestions); // Array of 5 title options

// 5. Batch generate
const batchTitles = await generator.generateBatch("Attack on Titan", 1, 5);
console.log(batchTitles); // { 1: "...", 2: "...", etc. }

// 6. UI Integration
const ui = new TitleGeneratorUI(generator);
ui.attachToButton("aiTitleBtn", "animeTitle", "episodeNumber", "episodeTitle");

// 7. Show suggestions in modal
ui.showSuggestions("Solo Leveling", 5, "suggestionsContainer");

// 8. Create settings panel
ui.createSettingsPanel("settingsContainer");

// 9. With OpenAI API
const generatorWithAPI = new AITitleGenerator("sk-YOUR-API-KEY", "gpt-4");
const advancedTitle = await generatorWithAPI.generateTitle("Jujutsu Kaisen", 20, "Yuji faces his greatest challenge yet");

*/
