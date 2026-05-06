<script setup lang="ts">
defineProps<{ name: string; class?: string }>()
</script>

<template>
  <img :src="`/icons/${name}.svg`" :class="$props.class" aria-hidden="true" />
</template>
