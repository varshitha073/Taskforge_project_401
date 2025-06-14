// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBqQ272r0YKg93eM6VWLe1BNxR-UFZYYbw",
  authDomain: "taskforge-e304f.firebaseapp.com",
  projectId: "taskforge-e304f",
  messagingSenderId: "260039066518",
  appId: "1:260039066518:web:0cebca7cf2505ce59c53b7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/reminder-icon.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
