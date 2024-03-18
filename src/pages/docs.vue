<script setup lang="ts" generic="T extends any, O extends any">
import asides from '~/layouts/asides.vue'
import mains from '~/layouts/mains.vue'
import headers from '~/layouts/headers.vue'

defineOptions({
  name: 'Docs',
})

// const name = ref('')

// const router = useRouter()
// function go() {
//   if (name.value)
//     router.push(`/hi/${encodeURIComponent(name.value)}`)
// }
</script>

<template>
  <el-container min-h="100vh">
    <asides />
    <el-container>
      <el-header>
        <headers />
      </el-header>
      <el-main><mains /></el-main>
    </el-container>
  </el-container>
</template>
