# 🏮 Kamalcodes Diary — “Tokyo Vibes Journal”

> A minimalist yet immersive developer journaling system built inside VSCode.  
> Features automatic daily and weekly log generation, a Tokyo-inspired Markdown theme, and safe anime GIFs for visual mood tracking.

---

## ✨ Table of Contents
1. [Overview](#-overview)
2. [Project Structure](#-project-structure)
3. [Installation](#-installation)
4. [Tokyo Vibes Markdown Theme](#-tokyo-vibes-markdown-theme)
5. [Font Setup](#-font-setup)
6. [Anime GIF Proxy Server](#-anime-gif-proxy-server)
7. [Log Generation Script](#-log-generation-script)
8. [Usage Examples](#-usage-examples)
9. [Preview](#-preview)

---

## 💡 Overview

**Kamalcodes Diary** is a fully automated Markdown-based journaling environment for developers, designed for daily reflection and long-term growth tracking.

### ✴️ Features
- 🧱 **Auto-generated logs** (daily & weekly)  
- 🎌 **SFW anime GIFs** loaded dynamically  
- 🎨 **Tokyo-inspired theme** via custom Markdown CSS  
- ⚙️ Node.js scripts for file creation and formatting  
- 🧠 Smart sorting and templating system  

---

## 📁 Project Structure

```
kamalcodes-diary/
│
├── 01-daily-log/           # Auto-generated daily entries
├── 02-weekly-review/       # Auto-generated weekly summaries
├── .resources/
│   ├── templates/          # Markdown templates
│   │   ├── daily-template.md
│   │   └── weekly-template.md
│   └── bg/                 # Optional background images
│
├── createLog.js            # Node.js script to generate logs
├── proxy.js                # Local anime GIF proxy server
├── markdown.css            # Tokyo Vibes Markdown theme
└── package.json
```

---

## ⚙️ Installation

### 1️⃣ Install dependencies
```bash
npm install express node-fetch image-size
```

### 2️⃣ Enable ESM mode
In your `package.json`:
```json
{
  "type": "module"
}
```

### 3️⃣ Launch the anime proxy server
```bash
node proxy.js
```

### 4️⃣ Generate logs
```bash
node createLog.js daily
# or
node createLog.js weekly
# or
node createLog.js project
```

---

## 🎨 Tokyo Vibes Markdown Theme

This project uses **Markdown Preview Enhanced** to render beautifully styled Markdown pages inside VSCode.

### Install the VSCode extension:
🔗 [Markdown Preview Enhanced – Marketplace](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

Then open:
```
Ctrl + Shift + P → Markdown Preview Enhanced: Customize CSS
Copy/paste the content css file named: example-style.less.css
```

---

## 🈶 Font Setup

| Font | Usage | Download |
|------|--------|-----------|
| **IBM Plex Mono** | Body text and code | [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono) |
| **Orbitron** | Headings | [Google Fonts](https://fonts.google.com/specimen/Orbitron) |
| **Chakra Petch** | Subheadings | [Google Fonts](https://fonts.google.com/specimen/Chakra+Petch) |

### Installation Steps
1. Download each font from Google Fonts (`Download Family`)
2. Double-click the `.ttf` files → **Install**
3. Restart VSCode to apply

---

## 🎌 Anime GIF Proxy Server

The proxy (`proxy.js`) randomly fetches safe-for-work anime GIFs from multiple APIs and redirects them as direct image URLs for Markdown embedding.

### Supported APIs
| API | Type | Safe | Direct GIF |
|------|------|------|-------------|
| [Nekos.best](https://nekos.best/) | Anime GIFs | ✅ | ✅ |
| [Waifu.pics](https://waifu.pics/) | Anime GIFs | ✅ | ✅ |
| [Otakugifs](https://otakugifs.xyz/) | Anime Reactions | ✅ | ✅ |
| [PurrBot](https://purrbot.site/) | Cute GIFs | ✅ | ✅ |

### Proxy Usage
```markdown
![](http://localhost:3000/random-anime)
![](http://localhost:3000/random-anime?format=landscape)
![](http://localhost:3000/random-anime?format=portrait)
```

#### Parameters
| Parameter | Description |
|------------|-------------|
| `format=landscape` | Only landscape images |
| `format=portrait` | Only portrait images |
| `format=any` | (Default) all orientations |
| `seed={{seed}}` | Unique random ID per file |

Each request:
- Selects a random API source  
- Chooses a category (`hug`, `smile`, `dance`, etc.)  
- Filters by format if specified  
- Appends a random timestamp to bypass caching  

---

## 🧠 Log Generation Script

Your `createLog.js` automatically creates and fills Markdown files from templates.

### Output
- 🗓️ `01-daily-log/YYYY-MM-DD.md`
- 📅 `02-weekly-review/week-XX-YYYY.md`

### Dynamic Variables
| Variable | Description |
|-----------|--------------|
| `format` | Format of GIF, not required (landscape, portrait) |
| `{{seed}}` | Random ID for unique GIF URL |

### Usage
```bash
node createLog.js daily
node createLog.js weekly
node createLog.js project
```

---

## 🖼️ Preview

| Element | Description |
|----------|--------------|
| **Theme** | Tokyo-inspired dark style (#0c111c) |
| **Fonts** | IBM Plex Mono, Orbitron, Chakra Petch |
| **Visuals** | SFW anime GIFs via local proxy |
| **Mode** | Markdown Preview Enhanced |

---

### 🧠 Author
**@kamalc0des**  
> *Build. Reflect. Improve.*  
> *The Tokyo Vibes Journal — a developer’s mindful workspace.*

---
