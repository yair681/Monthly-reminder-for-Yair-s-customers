// sw.js
// קובץ זה חייב להיות מוצג על ידי שרת אמיתי (או לפחות על ידי Live Server)
// כדי שהדפדפן יאפשר את רישום ה-Service Worker.

self.addEventListener('push', event => {
    // זה יקרה רק אם שרת backend אמיתי ישלח התראה!
    const data = event.data ? event.data.json() : { title: 'התראה חודשית אוטומטית', body: 'הגיע הזמן לבדוק את התשלומים!', url: '/alerts.html' };

    const title = data.title;
    const options = {
        body: data.body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💰</text></svg>',
        data: {
            url: data.url // הנתיב לפתיחה בלחיצה
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    // פתיחת הדף alerts.html בלחיצה על ההתראה
    const targetUrl = event.notification.data.url || '/alerts.html'; 
    event.waitUntil(
        clients.openWindow(targetUrl) 
    );
});

console.log('Service Worker נרשם בהצלחה.');
