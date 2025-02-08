<script setup lang="ts">
import { state } from "@/socket";
import { computed, onMounted, useTemplateRef, watch } from "vue";
import './assets/main.css'

const player = useTemplateRef('player')

watch(() => state.currentMediaChat, () => {
  if(state.currentMediaChat && state.currentMediaChat.duration) {
    console.log('currentMediaChat', state.currentMediaChat)
    setTimeout(() => {
      removeMediaChat()
    }, state.currentMediaChat.duration * 1000)
  }
})

const playVideo = () => {
  if (player.value) {
    player.value.play()
  }
}
const MediaIsVideo = computed(() => {
  return state.currentMediaChat && state.currentMediaChat.media.type === 'video'
})
const MediaIsImage = computed(() => {
  return state.currentMediaChat && state.currentMediaChat.media.type === 'image'
})
const removeMediaChat = () => {
  state.currentMediaChat = null
}

</script>

<template>
  <div class="grid grid-rows-[1fr_3fr_1fr] items-start select-none bg-opacity-1 h-screen gap-2 mt-4 w-full px-5" v-if="state.currentMediaChat">
    <div id="avatar" class="flex flex-col justify-center items-center floating w-fit">
      <img class="rounded-full md:w-18 w-10" :src="state.currentMediaChat.author.image" alt="avatar" />
      <h2 class="text-center md:text-xl text-sm font-bold uppercase text-outline-black text-white">{{ state.currentMediaChat.author.name }}</h2>
    </div>
    <div>
      <video v-if="MediaIsVideo" @ended="removeMediaChat" @canplay="playVideo" ref="player" class="m-auto max-h-[78vh]" autoplay>
        <source :src="state.currentMediaChat.media.url" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <img v-if="MediaIsImage" :src="state.currentMediaChat.media.url" alt="mediachat" class="h-fit"/>
    </div>
    <p class="w-full text-center md:text-3xl text-sm uppercase text-outline-black text-white font-bold">{{ state.currentMediaChat.message }} </p>
  </div>

</template>

<style>
        .floating {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, -10px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @layer utilities {
    .text-outline-black {
      text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }
  }
    </style>