<script setup lang="ts" generic="T extends any, O extends any">
import asides from '~/layouts/asides.vue'
import mains from '~/layouts/mains.vue'

defineOptions({
  name: 'Docs',
})
</script>

<template>
  <el-container>
    <asides />
    <el-container>
      <!-- <el-header>
        <headers />
      </el-header> -->
      <el-main><mains /></el-main>
    </el-container>
  </el-container>
</template>
