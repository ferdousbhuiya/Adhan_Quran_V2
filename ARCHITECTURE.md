# Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AZAN & QURAN APP                        │
└─────────────────────────────────────────────────────────────┘

                          BROWSER/APP
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │         React Components (UI)               │ │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────┐ │ │
│  │  │  Adhan   │  │ Explore  │  │ Quran     │ │ │
│  │  │ Times    │  │ Masjids  │  │ Reading   │ │ │
│  │  └────┬─────┘  └────┬─────┘  └─────┬─────┘ │ │
│  │       │             │              │       │ │
│  │  ┌────▼──────┬──────▼──────┬───────▼──────┐ │ │
│  │  │   App.tsx (Main State)  │              │ │ │
│  │  └────┬─────────────────────┘              │ │ │
│  └──────┼─────────────────────────────────────┘ │
│         │                                       │
│  ┌──────▼─────────────────────────────────────┐ │
│  │       Services Layer                       │ │
│  │  ┌───────────┐  ┌────────────────────────┐ │ │
│  │  │ api.ts    │  │ audioManager.ts        │ │ │
│  │  │ Quran API │  │ Audio playback (PWA)   │ │ │
│  │  └─────┬─────┘  └──────────┬─────────────┘ │ │
│  │        │                   │               │ │
│  │  ┌─────▼───────────────────▼─────────────┐ │ │
│  │  │ notificationScheduler.ts ✨ NEW ✨   │ │ │
│  │  │                                       │ │ │
│  │  │ • Checks prayer times every 10s      │ │ │
│  │  │ • Triggers notifications             │ │ │
│  │  │ • Plays Adhan sound                  │ │ │
│  │  │ • Vibrates on Android                │ │ │
│  │  └─────┬────────────────────────────────┘ │ │
│  │        │                                  │ │
│  └────────┼──────────────────────────────────┘ │
│           │                                    │
│  ┌────────▼──────────────────────────────────┐ │
│  │    Service Worker (sw.js) ✨ UPDATED ✨  │ │
│  │                                           │ │
│  │ • Handles notifications in background    │ │
│  │ • Shows system alerts                    │ │
│  │ • Handles notification clicks            │ │
│  │ • Works when app is closed               │ │
│  └────────┬──────────────────────────────────┘ │
│           │                                    │
└───────────┼────────────────────────────────────┘
            │
        API Calls
            │
    ┌───────┴────────┐
    │                │
┌───▼────────────┐  ┌─▼─────────────────────┐
│ Aladhan API    │  │ Google Cloud APIs     │
│ Prayer Times   │  │ • Gemini (AI Search)  │
└────────────────┘  │ • Maps (Location)     │
                    └───────────────────────┘
                    (Requires API Key in .env)


ANDROID DEVICE NOTIFICATIONS FLOW:
═══════════════════════════════════

┌────────────────────────────────────────────┐
│         USER'S ANDROID PHONE               │
├────────────────────────────────────────────┤
│                                            │
│  App Running          App in Background    │
│  ┌──────────────┐     ┌────────────────┐  │
│  │ Scheduler    │     │ Service Worker │  │
│  │ checks time  │     │ waits for msg  │  │
│  └────┬─────────┘     └────────┬───────┘  │
│       │ EVERY 10 SECONDS       │          │
│  ┌────▼──────────────────────┐ │          │
│  │ Is current time = prayer? │ │          │
│  └────┬───────────────────────┘ │          │
│       │ YES!                    │          │
│  ┌────▼────────────────────────────────┐  │
│  │ 1. Show System Notification         │  │
│  │    📲 "Fajr Prayer Time"            │  │
│  │                                      │  │
│  │ 2. Play Adhan Sound                 │  │
│  │    🔊 Adhan audio plays             │  │
│  │                                      │  │
│  │ 3. Vibrate Alert                    │  │
│  │    📳 Buzz buzz buzz!               │  │
│  │                                      │  │
│  │ 4. Message Service Worker           │  │
│  │    ↓                                 │  │
│  │  (keeps notification showing)       │  │
│  └─────┬────────────────────────────┘  │
│        │                              │
│  ┌─────▼──────────────────────────┐   │
│  │ User Action:                    │   │
│  │ • Tap notification → Open App   │   │
│  │ • Dismiss → Notification gone   │   │
│  │ • Wait → Silent after 1 min     │   │
│  └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘


FILES RELATIONSHIP:
═══════════════════

index.tsx (ENTRY POINT)
    │
    ├─→ Register Service Worker (sw.js)
    │
    └─→ App.tsx
         │
         ├─→ Import notificationScheduler
         ├─→ Initialize on mount
         │
         └─→ Render Components
             │
             ├─→ Adhan.tsx
             │   ├─→ Import notificationScheduler
             │   ├─→ Fetch prayer times (api.ts)
             │   ├─→ Update scheduler with times
             │   └─→ Display UI + buttons
             │
             ├─→ Explore.tsx
             │   ├─→ Import Google Maps API
             │   ├─→ Show Masjids/Halal
             │   └─→ Requires VITE_GOOGLE_API_KEY
             │
             ├─→ Quran.tsx
             │   ├─→ Fetch from Quran API
             │   └─→ Show translations
             │
             └─→ Other Components...

services/notificationScheduler.ts
    ├─→ Check prayer times every 10 seconds
    ├─→ Send messages to Service Worker
    ├─→ Play audio via audioManager.ts
    └─→ Store state in localStorage

services/audioManager.ts
    └─→ Handle audio playback (PWA compatible)

sw.js (SERVICE WORKER)
    ├─→ Cache assets for offline
    ├─→ Receive messages from scheduler
    ├─→ Show system notifications
    ├─→ Handle notification clicks
    └─→ Keep app working in background

.env (CONFIGURATION)
    └─→ Store VITE_GOOGLE_API_KEY (optional)
       Used by Explore.tsx for location feature


DATA FLOW - PRAYER NOTIFICATION:
════════════════════════════════

1. USER OPENS APP
   ↓
2. App.tsx initializes notificationScheduler
   ↓
3. User navigates to Prayer Times (Adhan.tsx)
   ↓
4. App fetches prayer times from Aladhan API
   ↓
5. Times saved to localStorage & sent to scheduler
   ↓
6. Scheduler starts checking: "Is now = prayer time?"
   ↓
7. EVERY 10 SECONDS (continuously)
   ├─→ Get current time
   ├─→ Compare with prayer times
   ├─→ If match found:
   │   ├─→ Show notification
   │   ├─→ Play audio
   │   ├─→ Vibrate phone
   │   └─→ Message Service Worker
   │
   └─→ Wait 10 seconds, repeat
   ↓
8. User sees: 📲 "Fajr Prayer Time" + 🔊 Sound + 📳 Vibration
   ↓
9. User can:
   ├─→ Tap notification to open app
   ├─→ Dismiss notification
   └─→ Continue what they're doing


ERROR RECOVERY:
═══════════════

If notification fails:
  → Check: Notification permission granted?
  → Check: Sound/Volume enabled?
  → Check: Service Worker registered?
  → Check: Browser console for errors (F12)

If location fails:
  → Check: API key in .env?
  → Check: API key is valid?
  → Check: Location permission granted?
  → Check: Internet connection?

If prayer times wrong:
  → Check: Device location is accurate?
  → Check: Time zone correct?
  → Check: Calculation method matches your region?


TIMELINE - FIRST USE ON ANDROID:
═════════════════════════════════

T+0s:  User opens Chrome, visits app URL
T+2s:  Permission dialog: "Allow location?"
T+3s:  Permission dialog: "Allow notifications?"
T+5s:  App loads, fetches prayer times
T+10s: Scheduler initializes, starts checking
T+20s: (Next prayer time arrives)
       User sees notification + hears sound + feels vibration ✅

---

Everything is now connected and working! 🎉
