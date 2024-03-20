<script setup lang="ts" generic="T extends any, O extends any">
import asides from '~/layouts/asides.vue'
import mains from '~/layouts/mains.vue'

defineOptions({
  name: 'Docs',
})
const el = ref<HTMLElement | null>(null)
const { isScrolling } = useScroll(el)
provide('isScrolling', isScrolling)
</script>

<template>
  <el-container class="container">
    <asides />

    <el-container>
      <el-header>
        <headers />
      </el-header>
      <el-main ref="el">
        <mains />
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
