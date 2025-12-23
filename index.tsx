import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Register service worker early for notifications
if ('serviceWorker' in navigator) {
  // Use Vite's base URL so the service worker path and scope are correct after build
  window.addEventListener('load', () => {
    const swPath = `${import.meta.env.BASE_URL}sw.js`;
    const swScope = import.meta.env.BASE_URL || '/';
    navigator.serviceWorker.register(swPath, { scope: swScope })
      .then(reg => {
        console.log('Service Worker registered successfully:', reg);
        if ('periodicSync' in reg && 'register' in reg.periodicSync) {
          (reg.periodicSync as any).register('check-prayer-times', { minInterval: 24 * 60 * 60 * 1000 })
            .catch((err: any) => console.log('Periodic sync registration failed:', err));
        }
      })
      .catch(err => console.warn('Service Worker registration failed:', err));
  });
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);