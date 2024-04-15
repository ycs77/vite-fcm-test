export const swRegistration = ref() as Ref<ServiceWorkerRegistration | undefined>

if ('serviceWorker' in navigator) {
  const isProd = import.meta.env.PROD

  navigator.serviceWorker
    .register(isProd ? '/sw.js' : '/dev-sw.js?dev-sw', {
      type: isProd ? 'classic' : 'module',
    })
    .then(registration => {
      swRegistration.value = registration
    })
}
