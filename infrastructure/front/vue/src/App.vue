<script setup lang="ts">
import { socket } from "@/socket";
import { state } from "@/socket";
import { onMounted, useTemplateRef, watch } from "vue";

const player = useTemplateRef('player')

const playVideo = () => {
  player.value.play()
}


</script>

<template>
  <p>State: {{ state.connected }}</p>
  <video @canplay="playVideo" ref="player" v-if="state.currentMediaChat" width="420" height="315"  autoplay>
    <source :src="state.currentMediaChat.media.url" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</template>
