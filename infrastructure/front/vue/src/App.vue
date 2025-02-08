<script setup lang="ts">
import { state } from "@/socket";
import { computed, onMounted, useTemplateRef, watch } from "vue";
import './assets/main.css'

const player = useTemplateRef('player')

watch(() => state.currentMediaChat, () => {
  console.log('currentMediaChat', state.currentMediaChat)
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

</script>

<template>
  <div class="flex flex-col items-start justify-between select-none bg-opacity-1 h-screen" v-if="state.currentMediaChat">
    <div id="avatar" class="flex flex-col justify-center items-center floating pt-4 pl-2">
      <img class="rounded-full" :src="state.currentMediaChat.author.image" alt="avatar" width="75" height="75" />
      <h2 class="text-center text-xl font-bold uppercase text-outline-black text-white">{{ state.currentMediaChat.author.name }}</h2>
    </div>
    <div class="w-full">
      <video v-if="MediaIsVideo" @canplay="playVideo" ref="player" class="m-auto h-fit" autoplay>
        <source :src="state.currentMediaChat.media.url" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <img v-if="MediaIsImage" :src="state.currentMediaChat.media.url" alt="mediachat" class="w-fit mx-10"/>
    <p class="w-full text-center text-3xl uppercase text-outline-black text-white font-bold">{{ state.currentMediaChat.message }} </p>
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