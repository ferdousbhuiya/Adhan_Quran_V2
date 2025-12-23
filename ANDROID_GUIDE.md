# Android PWA Setup Guide

## What is a PWA (Progressive Web App)?

This app is a PWA, meaning it can work like a native Android app but runs in the browser. It supports:
- ✅ Offline functionality
- ✅ Background notifications
- ✅ Home screen installation
- ✅ Full screen mode without browser UI

---

## Installation on Android

### Option 1: Install as App (Recommended)

1. Open the app in Chrome browser
2. Tap the **menu icon** (3 dots) in top-right corner
3. Select **"Install app"** or **"Add to Home screen"**
4. Confirm installation
5. The app now appears on your home screen with an app icon

### Option 2: Add to Home Screen

1. Tap the **menu icon** in Chrome
2. Select **"Add to Home screen"**
3. Choose a name and confirm
4. App shortcut appears on home screen

---

## First Time Setup (IMPORTANT!)

When you open the app for the first time:

1. **Allow Geolocation:**
   - This enables accurate prayer times for your location
   - Tap "Allow" when prompted

2. **Allow Notifications:**
   - This enables prayer time alerts
   - Tap "Allow" when prompted

3. **Wait for Loading:**
   - First load may take 5-10 seconds
   - This is normal (app is downloading prayer times)

---

## Enabling Notifications on Android

### If You Didn't Enable on First Load:

1. Open **Android Settings**
2. Go to **Apps > [App Name or Chrome]**
3. Select **Permissions**
4. Enable:
   - ✅ Notifications
   - ✅ Location
   - ✅ Microphone (optional, for audio playback)

### Verify Notifications Work:

1. Open the app's Prayer Times section
2. Scroll to "Test Audio" button
3. Tap it - you should hear a sound
4. If no sound, check:
   - Volume is not muted (check physical volume button)
   - Notifications are enabled in Android Settings

---

## How to Use Adhan Notifications

### Auto Notifications (Default)

1. Open **Prayer Times** section
2. For each prayer (Fajr, Dhuhr, Asr, Maghrib, Isha):
   - A **bell icon** appears on the right
   - If the bell is **full/colored** → notifications enabled ✅
   - If the bell is **empty/gray** → notifications disabled ❌

3. Tap the bell to toggle notifications on/off

### When Prayer Time Arrives:

- 🔔 **Notification appears** on your lock screen
- 📢 **Adhan sound plays** (if volume is on)
- 📳 **Phone vibrates** with a pattern

- Tap the notification to open the app
- Or dismiss and continue what you're doing

### Night Time Prayer Adjustments:

Go to **Prayer Times > Settings**:
- **Fajr Angle:** Earlier morning prayers (12-22°, default 18°)
- **Isha Angle:** Later night prayers (12-22°, default 18°)

---

## How to Use Masjid & Halal Food Locator

### Find Nearby Places:

1. Tap the **Explore** icon (from home screen or bottom menu)
2. Select either:
   - 🕌 **Masjids** - Find nearby Islamic centers
   - 🍴 **Halal Food** - Find nearby Halal restaurants

3. The app searches using your current location
4. Results show:
   - Place name
   - Address
   - Rating/Distance

5. Tap a result to open in **Google Maps** for full details/directions

### Make Sure Location is On:

1. Enable **Location services** in Android Settings
2. Allow the app to access location
3. Results will be more accurate if location is accurate

---

## Battery & Data Usage

### Battery:
- Prayer time checking happens every 10 seconds
- Uses minimal battery (~1-2% per hour in background)
- Disable notifications you don't need to save battery

### Data:
- First load: ~2-3 MB (downloads Quran & prayer times)
- Daily updates: ~100 KB (prayer time refresh)
- Explore feature: ~500 KB per search
- App works offline after first load!

### To Save Data:
1. Use WiFi for initial download
2. Turn off auto-refresh in settings (if available)
3. Disable location service between prayer times

---

## Common Issues & Solutions

### Problem: No Sound at Prayer Time

**Solution:**
1. Check device volume - press volume up button
2. Check not on silent mode (switch on side of phone)
3. Test audio: Prayer Times > scroll down > "Test Audio"
4. Go to Android Settings > Apps > [App] > Permissions > enable Microphone

### Problem: Notifications Not Appearing

**Solution:**
1. Open Android Settings > Apps > [App]
2. Tap Notifications > Turn ON
3. Enable "Allow notification"
4. Go back to Prayer Times and click bell icons to enable

### Problem: Wrong Prayer Times

**Solution:**
1. Check location is correct (Prayer Times header shows it)
2. Go to Settings > Done to refresh
3. Verify internet connection
4. Try manually setting location in Prayer Times > Settings > Custom Location

### Problem: App Keeps Closing

**Solution:**
1. Force stop the app: Settings > Apps > [App] > Force Stop
2. Restart the app
3. Clear app cache: Settings > Apps > [App] > Storage > Clear Cache
4. Reinstall if problem persists

### Problem: Can't Find Masjids/Halal Nearby

**Solution:**
1. Verify location is enabled and working
2. Check internet connection
3. Make sure API key is configured (developer only)
4. Try a different search term
5. Check you have good GPS signal (open sky is better)

---

## Tips & Tricks

### Tip 1: Always Keep App Updated
- Periodically check for app updates
- Rebuild/refresh the app for new features

### Tip 2: Customize Your Experience
1. Prayer Times > Settings:
   - Choose your calculation method (different for different regions)
   - Select your preferred Adhan voice
   - Adjust angle for Fajr/Isha based on your region

### Tip 3: Save Bandwidth
- Download Quran offline: Quran > Menu > Download Section
- Prayer times cache automatically

### Tip 4: Qiblah Compass
- Use it to find the right direction for prayer
- Tap compass icon at home screen

---

## Need Help?

Check these:
1. Open browser DevTools: F12 > Console
2. Look for any red error messages
3. Check logs for "Service Worker" status
4. Verify internet connection is working

---

**Version:** December 2025  
**Platform:** PWA (Android, iOS, Desktop)  
**Status:** ✅ Fully functional
