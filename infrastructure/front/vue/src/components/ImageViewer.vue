<script setup lang="ts">
const props = defineProps<{
  mediaUrl: string
}>()

let img = new Image();
img.src = props.mediaUrl;
</script>
<template>
  <img :src="mediaUrl" alt="mediachat" class="h-full hidden" />
  <img :src="mediaUrl" class="h-full" />
</template>
