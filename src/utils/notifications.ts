// Web Notifications Utility for Real Match Alerts

export async function requestMatchNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function isNotificationGranted(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
}

export function sendMatchNotification(title: string, body: string, icon: string = '/favicon.svg'): void {
  if (isNotificationGranted()) {
    try {
      new Notification(`ANKIX SPORTS: ${title}`, {
        body,
        icon,
        badge: '/favicon.svg',
      });
    } catch {
      // Ignore notification failures on unsupported environments
    }
  }
}
