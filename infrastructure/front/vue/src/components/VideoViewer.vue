<script setup lang="ts">
const props = defineProps<{
  mediaUrl: string
}>()

</script>
<template>

<video class="h-full" autoplay>
  <source :src="mediaUrl" type="video/mp4" />
  Your browser does not support the video tag.
</video>
</template>

