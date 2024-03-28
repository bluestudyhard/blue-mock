<script setup lang="ts" generic="T extends any, O extends any">
const route = useRoute()

const el = ref<HTMLElement | null>(null)
const { isScrolling } = useScroll(el)
provide('isScrolling', isScrolling)
</script>

<template>
  <el-container class="container">
    <docs-asides />

    <el-container>
      <el-header>
        <docs-headers />
      </el-header>
      <el-main ref="el">
        <!-- <docs-mains :key="name" /> -->
        <!-- <router-view /> -->
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
}
</style>
