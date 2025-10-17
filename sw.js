// sw.js (קובץ זה צריך להיות בתיקייה הראשית)
const CACHE_NAME = 'monthly-reminder-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/alerts.html',
    '/style.css',
    '/manifest.json',
    // יש להוסיף את קבצי האייקונים שלך לכאן:
    '/icon-192.png', 
    '/icon-512.png'
];

// 1. אירוע התקנה: שמירת הקבצים בקאש
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and adding files');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Cache installation failed:', error);
            })
    );
});

// 2. אירוע שליפה: הגשת קבצים מהקאש כשהאפליקציה במצב לא מקוון
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// 3. לוגיקת PUSH (להתראות דחיפה מהשרת)
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : { title: 'תזכורת אוטומטית', body: 'יש לקוחות לבדיקה.' };

    const title = data.title;
    const options = {
        body: data.body,
        icon: '/icon-192.png', 
        data: {
            url: data.url || '/alerts.html'
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const targetUrl = event.notification.data.url || '/alerts.html'; 
    event.waitUntil(
        clients.openWindow(targetUrl) 
    );
});
