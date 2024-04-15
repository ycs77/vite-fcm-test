import { getToken } from 'firebase/messaging'
import { getMessaging, isSupported } from '@/firebase'
import { swRegistration } from '@/register-sw'

export function useFCM() {
  const supported = ref(typeof Notification !== 'undefined')
  const permission = ref(typeof Notification !== 'undefined' ? Notification?.permission ?? 'default' : 'default')

  const mustRequestPermission = computed(() => supported.value && permission.value === 'default')

  isSupported().then(_supported => {
    supported.value = _supported
  })

  function subscribeFCM(promptClickedCallback?: () => void) {
    return new Promise<void>((resolve, reject) => {
      if (!supported.value || permission.value !== 'default') {
        promptClickedCallback?.()
        resolve()
        return
      }

      getMessaging().then(messaging => {
        if (messaging) {
          Notification.requestPermission()
            .then(_permission => {
              permission.value = _permission

              promptClickedCallback?.()

              return getToken(messaging!, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
                serviceWorkerRegistration: swRegistration.value,
              })
            })
            .then(token => {
              if (token) {
                registerFCM(token)
                  .then(resolve)
                  .catch(reject)
              } else {
                reject(new Error('No registration token available. Request permission to generate one.'))
              }
            })
            .catch(err => {
              promptClickedCallback?.()
              reject(err)
            })
        } else {
          promptClickedCallback?.()
          reject(new Error('Firebase Messaging is not supported.'))
        }
      })
    })
  }

  async function registerFCM(token: string) {
    console.log(`FCM token: ${token}`)
  }

  return { permission, supported, mustRequestPermission, subscribeFCM }
}
