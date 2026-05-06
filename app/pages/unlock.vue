<script setup lang="ts">
definePageMeta({ layout: false })

const SECRET = 'bm-internal-2026'

const route = useRoute()
const cookie = useCookie('hub_access', { maxAge: 60 * 60 * 24 * 30 })

if (route.query.key === SECRET) {
  cookie.value = 'true'
  await navigateTo('/')
} else {
  await navigateTo('/share/backfunds')
}
</script>

<template><div /></template>
