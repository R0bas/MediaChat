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
  <div class="flex flex-col items-start select-none" v-if="state.currentMediaChat">
    <div id="avatar" class="flex flex-col justify-center items-center floating pt-4 pl-2">
      <img class="rounded-3xl" :src="state.currentMediaChat.author.image" alt="avatar" width="50" height="50" />
      <h2 class="text-center text-xl font-black uppercase">{{ state.currentMediaChat.author.name }}</h2>
    </div>
    <video v-if="MediaIsVideo" @canplay="playVideo" ref="player" class="w-full" autoplay>
      <source :src="state.currentMediaChat.media.url" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <img v-if="MediaIsImage" :src="state.currentMediaChat.media.url" alt="mediachat" class="w-full px-10"/>
    <p class="w-full text-center text-3xl">{{ state.currentMediaChat.message }} </p>
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
    </style>