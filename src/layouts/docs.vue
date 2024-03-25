<script setup lang="ts" generic="T extends any, O extends any">
// import asides from '~/layouts/asides.vue'
// import mains from '~/layouts/mains.vue'
// import headers from '~/layouts/headers.vue'

const route = useRoute()
const name = ref('')
watchEffect(() => {
  if ('doc' in route.params)
    name.value = route.params.doc
})
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
        <docs-mains :key="name" />
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
