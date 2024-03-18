<!--
 * new page
 * @author: blue
 * @since: 2024-03-01
 * aside.vue
-->
<script setup lang="ts">
// import useDocsStore from '~/stores/docs'
import type { docsListType } from '~/types/index'

const docsList = ref<docsListType[]>([])
onMounted(async () => {
  // await useDocsStore().getDocsList()
  // docsList.value = useDocsStore().docsList
})
</script>

<template>
  <el-aside border="r" h="full" min-h="100vh" p="x-10 y-5" class="aside">
    这是侧边栏layout
    <div>
      <el-menu>
        <!-- <template v-for="(doc, index) in docsList">
          <el-menu-item>
            <span>
              {{ index }} {{ doc.name }} {{ doc.size }}
              {{ doc.created_at?.slice(0, 10) }}
            </span>
          </el-menu-item>
        </template> -->
      </el-menu>
    </div>
  </el-aside>
</template>

<style scoped lang="scss">
.aside {
  background-color: #f5f6f7;
  box-shadow: 1 0 2px rgba(0, 0, 0, 0.1);
}
</style>
