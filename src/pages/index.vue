<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <el-container min-h="100vh">
    <router-link to="/docs">
      docs
    </router-link>
  </el-container>
</template>
