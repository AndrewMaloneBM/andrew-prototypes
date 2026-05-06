export default defineNuxtRouteMiddleware((to) => {
  const baseURL = useRuntimeConfig().app.baseURL ?? ''
  if (!baseURL.includes('BackMarket-SellerXP')) return

  if (to.path.startsWith('/share') || to.path === '/unlock') return

  const cookie = useCookie('hub_access')
  if (cookie.value !== 'true') {
    return navigateTo('/share/backfunds')
  }
})
