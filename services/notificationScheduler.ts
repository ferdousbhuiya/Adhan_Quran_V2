import { PrayerTimes } from '../types';

interface ScheduledNotification {
  prayerName: string;
  time: string;
  timestamp: number;
  enabled: boolean;
}

class NotificationScheduler {
  private checkInterval: ReturnType<typeof setInterval> | null = null;
  private lastNotificationTime: Record<string, number> = {};
  private enabledPrayers: Record<string, boolean> = {};

  initialize(enabledPrayers: Record<string, boolean>) {
    this.enabledPrayers = enabledPrayers;
    
    // Request notification permission on Android/iOS
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }

    // Register service worker for background notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/AzanAndQuran/sw.js', { scope: '/AzanAndQuran/' })
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.warn('Service Worker registration failed:', err));
    }

    // Start checking for prayer times every 10 seconds
    this.startScheduler();
  }

  private startScheduler() {
    if (this.checkInterval) clearInterval(this.checkInterval);
    
    this.checkInterval = setInterval(() => {
      this.checkPrayerTime();
    }, 10000); // Check every 10 seconds
  }

  private checkPrayerTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Get stored prayer times from localStorage
    const storedTimes = localStorage.getItem('current_prayer_times');
    if (!storedTimes) return;

    try {
      const times = JSON.parse(storedTimes) as PrayerTimes;
      const prayers = [
        { name: 'Fajr', time: times.Fajr },
        { name: 'Dhuhr', time: times.Dhuhr },
        { name: 'Asr', time: times.Asr },
        { name: 'Maghrib', time: times.Maghrib },
        { name: 'Isha', time: times.Isha }
      ];

      prayers.forEach(prayer => {
        if (!this.enabledPrayers[prayer.name]) return;

        const [h, m] = prayer.time.split(':').map(Number);
        const prayerTimeInMinutes = h * 60 + m;

        // Check if current time matches prayer time (within 2-minute window)
        const timeDiff = Math.abs(currentTimeInMinutes - prayerTimeInMinutes);
        
        if (timeDiff <= 1) {
          // Prevent duplicate notifications within 5 minutes
          const lastNotif = this.lastNotificationTime[prayer.name] || 0;
          const timeSinceLastNotif = now.getTime() - lastNotif;

          if (timeSinceLastNotif > 5 * 60 * 1000) {
            this.triggerAdhan(prayer.name, prayer.time);
            this.lastNotificationTime[prayer.name] = now.getTime();
          }
        }
      });
    } catch (error) {
      console.error('Error checking prayer times:', error);
    }
  }

  private triggerAdhan(prayerName: string, prayerTime: string) {
    console.log(`🔔 Adhan time! ${prayerName} at ${prayerTime}`);

    // Show notification
    this.showNotification(prayerName, prayerTime);

    // Send message to service worker to play audio
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PLAY_ADHAN',
        prayer: prayerName,
        time: prayerTime
      });
    }

    // Also play audio in current window if it's open
    this.playAdhanSound(prayerName);
  }

  private showNotification(prayerName: string, time: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notificationOptions = {
        body: `${prayerName} prayer is starting at ${time}`,
        icon: '/AzanAndQuran/index.html',
        tag: `prayer-${prayerName}`,
        requireInteraction: true,
        vibrate: [200, 100, 200, 100, 200],
        badge: '/AzanAndQuran/index.html'
      };

      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'SHOW_NOTIFICATION',
          title: `${prayerName} Prayer Time`,
          options: notificationOptions
        });
      } else {
        new Notification(`${prayerName} Prayer Time`, notificationOptions);
      }
    }
  }

  private playAdhanSound(prayerName: string) {
    // Get stored adhan settings
    const settingsStr = localStorage.getItem('noor_settings');
    if (!settingsStr) return;

    try {
      const settings = JSON.parse(settingsStr);
      const voiceId = settings.adhan?.voiceId || 'makkah';

      // Map voice IDs to audio URLs (these should match your ADHAN_OPTIONS)
      const adhanUrls: Record<string, string> = {
        'makkah': 'https://cdn.islamic.network/quran/recitations/mp3/ar_ar_alafasy/001001.mp3',
        'madinah': 'https://cdn.islamic.network/quran/recitations/mp3/ar_ar_alafasy/001001.mp3',
        'default': 'https://cdn.islamic.network/quran/recitations/mp3/ar_ar_alafasy/001001.mp3'
      };

      const audioUrl = adhanUrls[voiceId] || adhanUrls['default'];
      const audio = new Audio(audioUrl);
      audio.play().catch(err => console.warn('Audio playback failed:', err));
    } catch (error) {
      console.error('Error playing adhan:', error);
    }
  }

  public updatePrayerTimes(times: PrayerTimes) {
    localStorage.setItem('current_prayer_times', JSON.stringify(times));
  }

  public updateEnabledPrayers(enabled: Record<string, boolean>) {
    this.enabledPrayers = enabled;
  }

  public stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

export const notificationScheduler = new NotificationScheduler();
