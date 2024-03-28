<!--
 * new page
 * @author: blue
 * @since: 2024-03-26
 * Share.vue
-->
<script setup lang="ts">
const visible = defineModel({ default: false })
const options = ref([
  {
    value: '1',
    label: '所有人可编辑',
  },
  {
    value: '2',
    label: '指定人可编辑',
  },
  {
    value: '3',
    label: '只读',
  },
])
</script>

<template>
  <div class="container">
    <el-dialog
      v-model="visible"
    >
      <span>和他人一起编辑</span>
      <span>分享链接</span>
      <span>链接权限
        <el-select v-model="options" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped></style>
