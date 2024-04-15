<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">FCM test</h1>

    <div class="mt-6">
      <button
        type="button"
        class="px-4 py-1.5 bg-violet-600 disabled:bg-violet-300 text-white rounded"
        :disabled="!mustRequestPermission"
        @click="subscribeFCM()"
      >
        註冊 FCM
      </button>
    </div>
  </div>
</template>

<script setup>
const { mustRequestPermission, subscribeFCM } = useFCM()
</script>
