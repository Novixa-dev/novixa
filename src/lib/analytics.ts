// Lightweight privacy-conscious analytics module for Novixa Platform

export function trackEvent(eventName: string, details?: Record<string, any>, page?: string, language?: string) {
  try {
    const payload = {
      event: eventName,
      page: page || window.location.hash || '/',
      language: language || document.documentElement.lang || 'ar',
      details: details || {},
      timestamp: new Date().toISOString()
    };

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {
        // Silently catch network failures in background logging
      });
    }
  } catch (err) {
    // Analytics logging failure should never disrupt UX
  }
}
