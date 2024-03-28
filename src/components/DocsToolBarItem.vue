<!--
 * new page
 * @author: blue
 * @since: 2024-03-28
 * DocsToolBarItem.vue
-->
<script setup lang="ts">
const props = defineProps<{
  item
}>()
</script>

<template>
  <div class="container">

      <el-dropdown-menu>
        <el-dropdown-item v-for="(menu, index) in item.dropDownMenu" :key="index">
          {{ menu }}
        </el-dropdown-item>
      </el-dropdown-menu>

  </div>
</template>

<style scoped></style>
