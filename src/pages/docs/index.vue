<!--
 * new page
 * @author: blue
 * @since: 2024-03-25
 * index.vue
-->
<script setup lang="ts">
import useDocsStore from '~/stores/docs'
import type { docsListType } from '~/types/index'

const { x, y, sourceType } = useMouse({ touch: false })
definePageMeta({
  layout: 'docs',
})
const tableRef = ref<HTMLElement>()
const isEditable = ref(false)
// const docsList = ref<docsListType[]>([])
onMounted(async () => {
  await useDocsStore().getDocsList()
})
const _docsList = computed(() => useDocsStore().docsList.map((item) => {
  return {
    ...item,
    updated_at: item.updated_at!.slice(0, 10),
  }
}))
const docName = ref('')
const router = useRouter()
function go(name: string) {
  if (name)
    router.push(`/docs/${encodeURIComponent(name)}`)
}
function handleRowClick(row: any, event: any) {
  go(row.name)
}
const toolTipPosition = ref({ top: 0, left: 0 })
// 计算每一行的位置
function handleRowContextmenu(row: any, event: any) {
  isEditable.value = !isEditable.value
  handleRowMouseenter()
  docName.value = row.name
}
// 计算tooltip位置
function handleRowMouseenter() {
  // 拿到table的位置
  // 获取鼠标每次点击的位置
  toolTipPosition.value.left = x.value
  toolTipPosition.value.top = y.value
}
function handleDelete() {
  isEditable.value = false
  ElMessageBox.alert('删除', '确定删除吗？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      useDocsStore().deleteDoc(docName.value)
    })
    .catch(() => {
      console.log('取消')
    })
}
onMounted(() => {

  // handleRowMouseenter()
})
</script>

<template>
  <div class="container" relative @contextmenu.prevent>
    <el-table
      ref="tableRef"
      border
      :data="_docsList"
      style="width: 100%"
      m-t="6rem"
      :default-sort="{ prop: 'updated_at', order: 'descending' }"
      :highlight-current-row="true"
      @row-contextmenu="handleRowContextmenu"
    >
      <el-table-column prop="name" label="文件名" width="380" />
      <el-table-column prop="size" label="文件大小" width="180" />
      <el-table-column prop="updated_at" sortable label="更新时间" />
    </el-table>

    <div
      v-if="isEditable" class="edit"
      fixed
      z-999
      :style="{ top: `${toolTipPosition.top}px`, left: `${toolTipPosition.left}px` }"
    >
      <el-button type="primary">
        分享
      </el-button>
      <el-button type="danger" @click="handleDelete">
        删除
      </el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
