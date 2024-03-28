<!--
 * new page
 * @author: blue
 * @since: 2024-03-01
 * aside.vue
-->
<script setup lang="ts">
import useDocsStore from '~/stores/docs'
import type { docsListType } from '~/types/index'

const docsList = ref<docsListType[]>([])
onMounted(async () => {
  await useDocsStore().getDocsList()
  docsList.value = useDocsStore().docsList
})

function go(name: string) {
  if (name)
    navigateTo(`/docs/${encodeURIComponent(name)}`)
}
</script>

<template>
  <el-aside border="r" h="full" min-h="100vh" p=" y-2" class="aside" width="250px">
    <h1 text-center>
      mk云文档
    </h1>

    <el-row class="tac">
      <el-col flex-col>
        <el-menu
          default-active="3"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <el-icon><ElIconHouse /></el-icon>
            <span @click="navigateTo('/')">主页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><ElIconMemo /></el-icon>
            <span>多维表格</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><ElIconDocument /></el-icon>
            <span @click="navigateTo('/docs')">云文档</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><ElIconSetting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<style>
ol,
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

<style scoped lang="scss">
.aside {
  background-color: #f5f6f7;
  box-shadow: 1px 0px 2px rgba(110, 110, 110, 0.1);
  height: 100%;
  overflow: hidden;
}
</style>
