<script setup lang="ts">
import { computed, useTemplateRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSocket } from '../composables/socket'

const route = useRoute();
const room = route.params.key as string ?? 'default';
const timeoutId = ref(0)

const { currentMediaChat, getNextMessage } = useSocket(room)
const player = useTemplateRef('player')
const playerKey = ref(0)


watch(
  () => currentMediaChat,
  () => {
    if (currentMediaChat.value && currentMediaChat.value.duration) {
      console.log('is MediaChat ', currentMediaChat.value)
      timeoutId.value = setTimeout(async () => {
        await goToNextMediaChat()
      }, currentMediaChat.value.duration * 1000)
    }
    else {
      console.log('is not MediaChat')
      resetTimeout()
    }
  },
  {deep: true}
)

const playVideo = () => {
  if (player.value) {
    player.value.play()
  }
}


const MediaIsVideo = computed(() => {
  return currentMediaChat.value?.media && currentMediaChat.value.media.type === 'video'
})
const MediaIsImage = computed(() => {
  return currentMediaChat.value?.media && currentMediaChat.value.media.type === 'image'
})
const MediaIsAudio = computed(() => {
  return currentMediaChat.value?.media && currentMediaChat.value.media.type === 'sound'
})

const resetTimeout = () => {
  clearTimeout(timeoutId.value)
  timeoutId.value = 0
}
const goToNextMediaChat = async () => {
  resetTimeout();
  if (MediaIsVideo) playerKey.value++
  await getNextMessage()
}
</script>

<template>
  <div
    class="grid grid-rows-[1fr_3fr_1fr] items-start select-none bg-opacity-1 h-screen gap-2 mt-4 w-full px-5 overflow-y-hidden"
    v-if="currentMediaChat">
    <div v-if="!currentMediaChat.options?.hideAuthor" id="avatar"
      class="flex flex-col justify-between items-center floating w-fit">
      <img class="rounded-full md:w-18 w-10" :src="currentMediaChat.author.image" alt="avatar" />
      <h2 class="text-center md:text-xl text-sm font-bold uppercase text-outline-black text-white">
        {{ currentMediaChat.author.name }}
      </h2>
    </div>
    <div class="m-auto max-h-[78vh] h-full">
      <video :key="playerKey" v-if="MediaIsVideo" @ended="goToNextMediaChat" @canplay="playVideo" ref="player"
        class="h-full" autoplay>
        <source v-if="currentMediaChat.media" :src="currentMediaChat.media.url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img v-if="MediaIsImage && currentMediaChat.media?.url" :src="currentMediaChat.media.url" class="h-full" />
      <audio v-if="MediaIsAudio" autoplay @ended="goToNextMediaChat" class="h-full">
        <source v-if="currentMediaChat.media" :src="currentMediaChat.media.url" type="audio/mpeg" />
      </audio>
    </div>
    <div class="m-auto">
      <p class="w-full text-center md:text-3xl text-sm uppercase text-outline-black text-white font-bold">
        {{ currentMediaChat.message }}
      </p>
    </div>
  </div>
</template>

<style>
.floating {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 1vh);
  }

  50% {
    transform: translate(0, 3vh);
  }

  100% {
    transform: translate(0, 1vh);
  }
}

@layer utilities {
  .text-outline-black {
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }
}

body {
  overflow-y: hidden;
}
</style>
