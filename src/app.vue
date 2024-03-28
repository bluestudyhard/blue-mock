<script setup lang="ts">
// import { appDescription, appName } from '~/constants'
import 'tippy.js/dist/tippy.css'

// const host = useRequestURL().origin
// const img = `${host}/nuxt.svg`

// useSeoMeta({
//   title: appName,
//   description: appDescription,
//   twitterTitle: appName,
//   twitterDescription: appDescription,
//   twitterImage: img,
//   twitterCard: 'summary_large_image',
//   ogUrl: host,
//   ogImage: img,
//   ogDescription: appDescription,
//   ogTitle: appName,
// })

// useHead({
//   htmlAttrs: {
//     lang: 'en',
//   },
//   link: [
//     {
//       rel: 'icon',
//       type: 'image/x-icon',
//       href: '/favicon.ico',
//     },
//   ],
// })
</script>

<template>
  <ClientOnly>
    <NuxtLayout>

      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>

<style>

</style>
