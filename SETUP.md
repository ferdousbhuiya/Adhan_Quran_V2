# Setup Guide for Azan & Quran App

## Issues Fixed

### 1. ✅ Adhan (Prayer Time Notifications) - NOW WORKING
- Implemented background notification scheduler
- Service worker handles notifications even when app is closed
- Automatic detection of prayer times with 10-second check interval
- Vibration and sound alerts on Android

### 2. ✅ Location for Masjid & Halal Food - REQUIRES API KEY
- Feature is implemented and ready to use
- Requires Google API key setup

---

## Setup Instructions

### Step 1: Get Your Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - **Gemini API** (for AI-powered place search)
   - **Maps API** (for location grounding)
4. Create an **API Key** credential
5. Copy your API key

### Step 2: Configure Environment Variables

1. Open the `.env` file in the project root
2. Add your API key:
   ```
   VITE_GOOGLE_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```
3. Save the file

### Step 3: Run the App

```bash
npm run dev
```

Then build for production:
```bash
npm run build
```

---

## How Adhan Notifications Work

### Desktop/Web Browser
- ✅ Notifications appear when prayer time is reached
- ✅ Sound plays automatically
- ✅ Click notification to open the app

### Android Phone (PWA)
1. **First Time Setup:**
   - When you first open the app, grant notification permission
   - The app will register a Service Worker

2. **Background Notifications:**
   - Notifications work even when the app is closed
   - The app checks prayer times every 10 seconds
   - When a prayer time is reached, an alert triggers with:
     - System notification
     - Vibration pattern
     - Adhan sound

3. **To Keep It Working:**
   - Don't force-stop the app
   - Keep the device unlocked for notifications to play audio
   - Ensure notifications are enabled in Android settings

### Privacy & Permissions Needed
- **Geolocation:** Auto-detect your location for accurate prayer times
- **Notifications:** Get alerts when prayers are due
- **Vibration:** Haptic feedback for alerts
- **Audio:** Play Adhan when prayer time arrives

---

## Troubleshooting

### Notifications Not Working

1. **Check Notification Permission:**
   - Go to Android Settings > Apps > [App Name] > Permissions
   - Enable "Notifications"

2. **Service Worker Not Running:**
   - Open DevTools (F12) > Application > Service Workers
   - Check if service worker shows "activated and running"

3. **Prayer Times Not Updating:**
   - Check internet connection
   - Go to Prayer Times > Settings > Done to refresh
   - Verify location is correct (shown in header)

4. **Sound Not Playing:**
   - Check device volume is not muted
   - Ensure app has audio permission in Android settings
   - Try the "Test Audio" button in Prayer Times settings

### Location (Masjid & Halal) Not Working

1. **API Key Not Set:**
   - Verify API key is in `.env` file
   - Rebuild app: `npm run build`
   - Refresh browser (Ctrl+Shift+R)

2. **API Key Restrictions:**
   - Check Google Cloud Console
   - Ensure API key has no IP/referrer restrictions
   - Or add your domain: `yourdomain.com`

3. **Permissions Denied:**
   - Grant location permission when prompted
   - Check browser console (F12) for error messages

---

## Architecture

### Files Modified/Created:

- **`.env`** - Environment variables (Google API Key)
- **`services/notificationScheduler.ts`** - NEW: Handles prayer time checking & notifications
- **`sw.js`** - Updated: Service worker for background notifications
- **`components/Adhan.tsx`** - Updated: Integrated notification scheduler
- **`App.tsx`** - Updated: Initialize scheduler on app load
- **`index.tsx`** - Updated: Early service worker registration

### How It Works:

1. App loads and registers Service Worker
2. Notification Scheduler initializes
3. Every 10 seconds, scheduler checks if current time matches any prayer time
4. When prayer time is reached:
   - System notification is shown
   - Adhan audio plays
   - Vibration pattern activates
5. Service Worker handles notifications even when app is in background

---

## Next Steps (Optional Enhancements)

- [ ] Add location caching for faster prayer time updates
- [ ] Implement snooze/dismiss for notifications
- [ ] Add custom Adhan voice selection to scheduler
- [ ] Store prayer times for offline use
- [ ] Add prayer completion tracking

---

## Questions or Issues?

Check your browser's Developer Console (F12) for any error messages that can help debug issues.
