<script setup lang="ts">
import { computed, onMounted, useTemplateRef, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSocket } from '../socket'
const route = useRoute();

onMounted(() => {
  console.log('here', route.params.key);
})

const room = route.params.key as string ?? 'default';
const {state} = useSocket(room)


const player = useTemplateRef('player')

watch(
  () => state.currentMediaChat,
  () => {
    if (state.currentMediaChat && state.currentMediaChat.duration) {
      console.log('currentMediaChat', state.currentMediaChat)
      setTimeout(() => {
        removeMediaChat()
      }, state.currentMediaChat.duration * 1000)
    }
  },
)

const playVideo = () => {
  if (player.value) {
    toggleShowMedia()
    player.value.play()
  }
}

let showMediachat = ref(false)
const toggleShowMedia = () => {
  showMediachat.value = !showMediachat.value
}

const MediaIsVideo = computed(() => {
  return state.currentMediaChat.media && state.currentMediaChat.media.type === 'video'
})
const MediaIsImage = computed(() => {
  return state.currentMediaChat.media && state.currentMediaChat.media.type === 'image'
})
const removeMediaChat = () => {
  state.currentMediaChat = null
  toggleShowMedia()
}
</script>

<template>
  <div
    class="grid grid-rows-[1fr_3fr_1fr] items-start select-none bg-opacity-1 h-screen gap-2 mt-4 w-full px-5 overflow-y-hidden"
    v-if="state.currentMediaChat"
  >
    <div
      v-if="!state.currentMediaChat.options.hideAuthor && showMediachat"
      id="avatar"
      class="flex flex-col justify-between items-center floating w-fit"
    >
      <img
        class="rounded-full md:w-18 w-10"
        :src="state.currentMediaChat.author.image"
        alt="avatar"
      />
      <h2 class="text-center md:text-xl text-sm font-bold uppercase text-outline-black text-white">
        {{ state.currentMediaChat.author.name }}
      </h2>
    </div>
    <div class="m-auto max-h-[78vh] h-full">
      <video
        v-if="MediaIsVideo"
        @ended="removeMediaChat"
        @canplay="playVideo"
        ref="player"
        class="h-full"
        autoplay
      >
        <source :src="state.currentMediaChat.media.url" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img
        v-if="MediaIsImage"
        :src="state.currentMediaChat.media.url"
        alt="mediachat"
        class="h-full hidden"
        @load="toggleShowMedia"
      />
      <img
        v-if="MediaIsImage && showMediachat"
        :src="state.currentMediaChat.media.url"
        class="h-full"
      />
    </div>
    <div class="m-auto">
      <p
        v-if="showMediachat"
        class="w-full text-center md:text-3xl text-sm uppercase text-outline-black text-white font-bold"
      >
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
