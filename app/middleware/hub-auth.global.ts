export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/share') || to.path === '/unlock') return

  const cookie = useCookie('hub_access')
  if (cookie.value !== 'true') {
    return navigateTo('/share/backfunds')
  }
})
