import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

self.skipWaiting()
clientsClaim()

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

const messaging = getMessaging(firebaseApp)

onBackgroundMessage(messaging, payload => {
  // if (payload.data?.title) {
  //   self.registration.showNotification(payload.data.title, {
  //     body: payload.data.body,
  //     icon: '/logo.png',
  //     data: {
  //       link: payload.data.link,
  //     },
  //   })
  // }
})

// self.addEventListener('notificationclick', event => {
//   event.stopImmediatePropagation()
//   event.notification.close()

//   if (event.notification?.data?.link) {
//     const url = new URL(event.notification?.data?.link, self.location.href)

//     self.clients.openWindow(url)
//   }
// })
