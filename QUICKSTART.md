# Quick Start - 5 Minutes Setup

## For Developers

### 1️⃣ Clone & Install (2 min)
```bash
cd AzanAndQuran-main
npm install
```

### 2️⃣ Create .env File (1 min)
Create a file named `.env` in project root:
```
VITE_GOOGLE_API_KEY=sk-your-google-api-key-here
```

Don't have an API key? 
- Get it from: https://console.cloud.google.com/
- Enable Gemini API and Maps API
- Create an API key credential

### 3️⃣ Run Development Server (1 min)
```bash
npm run dev
```

Visit: http://localhost:3000

### 4️⃣ Build for Production (1 min)
```bash
npm run build
```

Deploy the `dist/` folder to your web server.

---

## For Android Users

### 1️⃣ Open App in Chrome
Visit: `https://yourdomain.com/AzanAndQuran/`

### 2️⃣ Install as App
- Tap menu (3 dots)
- Select **"Install app"**
- Or **"Add to Home screen"**

### 3️⃣ Grant Permissions
When prompted:
- ✅ **Allow Location** - For accurate prayer times
- ✅ **Allow Notifications** - For prayer alerts

### 4️⃣ Enable Prayer Notifications
1. Open **Prayer Times** section
2. Toggle bell icons to enable notifications
3. Test: Scroll down, tap "Test Audio"
4. You should hear sound and see notification

### 5️⃣ Find Masjids & Halal Food
1. Go to **Explore** section
2. Choose Masjids or Halal Food
3. See nearby places
4. Tap to open in Google Maps

---

## That's It! 🎉

### Your App Now Has:
- ✅ **Prayer Notifications** - Automatic alerts at prayer times
- ✅ **Masjid & Halal Locator** - Find nearby places
- ✅ **Quran with Translations**
- ✅ **Prayer Times by Location**
- ✅ **Works Offline** (after first load)
- ✅ **Installable on Home Screen**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No notifications | Grant notification permission in Android Settings |
| No sound | Check device volume, test audio button |
| Wrong prayer times | Go to Prayer Times > Done to refresh |
| Can't find Masjids | Ensure API key is in `.env` and app is rebuilt |
| App keeps closing | Force stop and restart: Settings > Apps > [App] > Force Stop |

---

## Next Steps

1. **Customize:** Prayer Times > Settings to adjust angles & voice
2. **Download Quran:** Quran section > Download for offline reading
3. **Share:** Share your home screen icon with others
4. **Feedback:** Test on different devices and report issues

---

**Questions?** Check SETUP.md for detailed instructions.  
**Android Help?** See ANDROID_GUIDE.md for user manual.
