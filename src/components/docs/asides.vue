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
  <el-aside border="r" h="full" min-h="100vh" p="x-4 y-5" class="aside" text-center>
    <h1>mk云文档</h1>
    <div>
      <el-menu>
        <template v-for="(doc) in docsList" :key="doc.name">
          <el-menu-item w="full" class="menu-item">
            <span
              text-center
              text="1rem"
              @click.prevent="go(doc.name)"
            >
              {{ doc.name }}
            </span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>

<style scoped lang="scss">
.aside {
  background-color: #f5f6f7;
  box-shadow: 1px 0px 2px rgba(110, 110, 110, 0.1);
  height: 100%;
  overflow: hidden;
}
</style>
