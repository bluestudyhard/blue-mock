<!--
 * new page
 * @author: blue
 * @since: 2024-03-27
 * DocsToolBar.vue
-->
<script setup lang="ts">
import type { docsToolBarType } from '~/types/index'
import useDocsStore from '~/stores/docs'

const props = defineProps<{
  docsToolBar: docsToolBarType[]
}>()
const docName = ref('')
const dialogVisible = ref(false)
const store = useDocsStore()
// 将icon的字符串名字转化为innerHTML
async function addNewDoc(name: string) {
  dialogVisible.value = false
  await store.createDoc(name)
}
</script>

<template>
  <div class="container">
    <template v-for="item in props.docsToolBar" :key="item.name">
      <el-dropdown m="r-8">
        <div
          class="toolbar-item"
          w="18rem"
          flex items-center justify-between
          p="x-4 y-1"
          @click="item.icon === 'ElIconDocumentAdd' ? dialogVisible = true : null"
        >
          <span flex items-center>
            <el-icon
              :color="item.color"
              size="30"
              m="l-2 r-3"
              :icon="item.icon"
            >
              <ElIconDocumentAdd v-if="item.icon === 'ElIconDocumentAdd'" />
              <ElIconUploadFilled v-else />
            </el-icon>
            <span
              m-t-2 flex flex-col justify-start text-left
            >
              <p m-0 color-black font-550>{{ item.name }}</p>
              <p m="y-2">{{ item.description }}</p>
            </span>

          </span>
          <el-icon class="el-icon--right">
            <ElIconArrowDown />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(menu, index) in item.dropDownMenu" :key="index">
              <el-tooltip :content="menu.description" placement="left">
                <span @click="menu.method(docName)">{{ menu.name }}</span>
              </el-tooltip>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <el-dialog
      v-model="dialogVisible"
      title="新建文档"
      width="500"
    >
      <el-input v-model="docName" />
      <el-button @click="dialogVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="addNewDoc(docName)">
        Confirm
      </el-button>
    </el-dialog>
  </div>
</template>

<style scoped lang='scss'>
.toolbar-item {
  border-radius: 0.2rem;
  box-shadow: 0px 1px 2px rgba(134, 133, 133, 0.272);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #edeeee;
  }
}
</style>

<style lang="scss">
.el-dropdown-menu__item {
  width: 16rem;
}
.el-tooltip__trigger {
  cursor: pointer;
  outline: none;
}
</style>
