# בסיס: תמונת Nginx קלה
FROM nginx:alpine

# מעתיק את הקבצים שלך (index.html, alerts.html, style.css) לתיקיית ברירת המחדל של Nginx
COPY . /usr/share/nginx/html

# חשיפת פורט 80 שבו Nginx מקשיב
EXPOSE 80

# הפעלת Nginx
CMD ["nginx", "-g", "daemon off;"]
