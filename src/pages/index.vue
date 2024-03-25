<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <el-container min-h="100vh">
    <NuxtLink to="/docs">
      docs
    </NuxtLink>
  </el-container>
</template>
