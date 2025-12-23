
# 🌙 Noor - Islamic Companion App

A high-performance, offline-first Islamic application built with React, Tailwind CSS, and Google Gemini API. Designed for spiritual consistency with a premium user experience.

## ✨ What's New (December 2025)

### 🔔 Automatic Prayer Notifications ✅
- **Adhan alerts** trigger automatically at prayer times
- Works even when the app is **closed in background**
- Includes **sound, vibration, and system notifications**
- No additional setup needed!

### 📍 Masjid & Halal Locator (Ready to Use)
- Find nearby Islamic centers and halal restaurants
- Requires Google API key (optional feature)

## 🚀 Key Features
- **Holy Quran**: Read and listen with multi-Qari support. Offline mode allows downloading Surahs to your device.
- **Prayer Times**: Highly accurate timings with **automatic Adhan notifications** ✨ NEW
- **Digital Tasbih**: Interactive counter with haptic feedback, AI voice-to-arabic, and image-to-arabic conversion.
- **Dua Library**: Personal supplication manager with benefit tracking and recitation modes.
- **Explore Nearby**: Find Masjids and Halal restaurants using AI-powered grounding. ✨ READY
- **Qiblah Finder**: Real-time compass for accurate prayer direction.

## 📦 Quick Start

### For Users (Android Phone)
```
1. Open app in Chrome browser
2. Tap menu (3 dots) > "Install app"
3. Grant Location & Notification permissions
4. Enable prayer notifications (bell icons)
5. Done! Notifications trigger automatically ✨
```

### For Developers
```bash
# 1. Install & Setup
npm install

# 2. Create .env file (optional)
echo 'VITE_GOOGLE_API_KEY=your_api_key_here' > .env

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
```

See **[QUICKSTART.md](QUICKSTART.md)** for detailed setup.

## 📖 Documentation

| Guide | Purpose |
|-------|---------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide |
| [SETUP.md](SETUP.md) | Detailed developer setup |
| [ANDROID_GUIDE.md](ANDROID_GUIDE.md) | User manual for Android phones |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System design & data flow |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Technical details |
| [CHANGES_SUMMARY.md](CHANGES_SUMMARY.md) | What changed in this update |

## 📦 Deployment Guide

### Local Setup
1. Clone the repository.
2. Ensure you have Node.js installed.
3. Install dependencies: `npm install`
4. Create a `.env` file and add: `VITE_GOOGLE_API_KEY=your_google_api_key_here`
5. Run the dev server: `npm run dev`
6. Build for production: `npm run build`

### GitHub Pages (Recommended)
1. Push your code to a repository.
2. Update base URL in vite.config.ts if needed
3. Build: `npm run build`
4. Deploy dist/ folder to GitHub Pages or your server
5. Set environment variables in your hosting platform

### Environment Variables
```bash
# Required for Location feature (Masjid/Halal finder)
VITE_GOOGLE_API_KEY=your_google_api_key

# Get from: https://console.cloud.google.com/
# Enable: Gemini API + Maps API
```

## 🛠 Tech Stack
- **Framework**: React 19
- **Styling**: Tailwind CSS (with Glassmorphism)
- **Icons**: Lucide React
- **AI**: @google/genai (Gemini 2.5/3.0)
- **Database**: IndexedDB (Offline Persistence)

## 🔒 Privacy & Offline Support
Noor uses **IndexedDB** to store your downloaded Quran content and settings directly in your browser's memory. No data is sent to a server except for API calls to fetch prayer times and AI processing.

---
*Built with heart for the Ummah.*
