<script setup lang="ts">
import { computed, useTemplateRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSocket } from '../composables/socket'

const route = useRoute();
const room = route.params.key as string ?? 'default';
const timeoutId = ref(0)

const { state, queue, getNextMessage } = useSocket(room)
const player = useTemplateRef('player')
const playerKey = ref(0)
const showMediachat = ref(false)


watch(
  () => state.currentMediaChat,
  () => {
    if (state.currentMediaChat && state.currentMediaChat.duration) {
      if (MediaIsJustText) toggleShowMedia(true)
      timeoutId.value = setTimeout(async() => {
        await removeMediaChat()
      }, state.currentMediaChat.duration * 1000)
    }
  },
)

const playVideo = () => {
  if (player.value) {
    toggleShowMedia(true)
    player.value.play()
  }
}

const toggleShowMedia = (bool: boolean) => {
  showMediachat.value = bool || !showMediachat.value
}

const showMedia = () => {
  toggleShowMedia(true);
}

const hideMedia = () => {
  toggleShowMedia(false);
}

const MediaIsVideo = computed(() => {
  return state.currentMediaChat.media && state.currentMediaChat.media.type === 'video'
})
const MediaIsImage = computed(() => {
  return state.currentMediaChat.media && state.currentMediaChat.media.type === 'image'
})
const MediaIsAudio = computed(() => {
  return state.currentMediaChat.media && state.currentMediaChat.media.type === 'sound'
})
const MediaIsJustText = computed(() => {
  return !state.currentMediaChat.media && state.currentMediaChat.message.length > 0
})

const removeMediaChat = async() => {
  if (MediaIsVideo) playerKey.value++
  await getNextMessage()
  toggleShowMedia(false)
}
</script>

<template>
  <div
    class="grid grid-rows-[1fr_3fr_1fr] items-start select-none bg-opacity-1 h-screen gap-2 mt-4 w-full px-5 overflow-y-hidden"
    v-if="state.currentMediaChat">
    <div v-if="!state.currentMediaChat.options.hideAuthor && showMediachat" id="avatar"
      class="flex flex-col justify-between items-center floating w-fit">
      <img class="rounded-full md:w-18 w-10" :src="state.currentMediaChat.author.image" alt="avatar" />
      <h2 class="text-center md:text-xl text-sm font-bold uppercase text-outline-black text-white">
        {{ state.currentMediaChat.author.name }}
      </h2>
    </div>
    <div class="m-auto max-h-[78vh] h-full">
      <video :key="playerKey" v-if="MediaIsVideo" @ended="removeMediaChat" @canplay="playVideo" ref="player" class="h-full" autoplay>
        <source :src="state.currentMediaChat.media.url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img v-if="MediaIsImage" :src="state.currentMediaChat.media.url" alt="mediachat" class="h-full hidden"
        @load="showMedia" />
      <img v-if="MediaIsImage && showMediachat" :src="state.currentMediaChat.media.url" class="h-full" />
      <audio v-if="MediaIsAudio" autoplay @ended="removeMediaChat" @canplay="showMedia" class="h-full">
        <source :src="state.currentMediaChat.media.url" type="audio/mpeg" />
      </audio>
    </div>
    <div class="m-auto">
      <p v-if="showMediachat"
        class="w-full text-center md:text-3xl text-sm uppercase text-outline-black text-white font-bold">
        {{ state.currentMediaChat.message }}
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
