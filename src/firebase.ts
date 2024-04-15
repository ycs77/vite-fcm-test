import { initializeApp } from 'firebase/app'
import { getMessaging as getFirebaseMessaging, isSupported } from 'firebase/messaging'
import type { Messaging } from 'firebase/messaging'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

let messaging: Messaging | null = null

async function getMessaging() {
  if (messaging) {
    return messaging
  }

  if (await isSupported()) {
    messaging = getFirebaseMessaging(app)

    return messaging
  }

  return null
}

export { getMessaging, isSupported }
