<script setup lang="ts">
import { socket } from "@/socket";
import { state } from "@/socket";
import { onMounted, useTemplateRef, watch } from "vue";

const player = useTemplateRef('player')

const playVideo = () => {
  if (player.value) {
    player.value.play()
  }
}

</script>

<template>
  <p>State: {{ state.connected }}</p>
  <template v-if="state.currentMediaChat">
    <p>Current user: {{ state.currentMediaChat.author.name }}</p>
    <video @canplay="playVideo" ref="player" width="420" height="315" autoplay>
      <source :src="state.currentMediaChat.media.url" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p>{{ state.currentMediaChat.message }}</p>
  </template>

</template>
