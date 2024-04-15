import dotenv from 'dotenv'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'

dotenv.config({
  path: ['.env.local', '.env'],
})

const app = initializeApp({
  credential: applicationDefault(),
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
})

getMessaging(app).send({
  token: process.env.FIREBASE_REGISTRATION_TOKEN!,
  // data: {
  //   title: '發送一則測試通知',
  //   body: '為什麼要發通知???',
  //   link: '/123',
  // },
  notification: {
    title: '發送一則測試通知',
    body: '為什麼要發通知???',
  },
  webpush: {
    fcmOptions: {
      link: '/123',
    },
  },
})
  .then(response => {
    console.log('Successfully sent message:', response)
  })
  .catch(error => {
    console.log('Error sending message:', error)
  })
