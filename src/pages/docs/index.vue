<script setup lang="ts" generic="T extends any, O extends any">
import useDocsStore from '~/stores/docs'

defineOptions({
  name: 'DocsIndexPage',
})
const store = useDocsStore()
onMounted(async () => {
  const res = await store.getDocsList()
  console.log(res)
})

const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/docs/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <el-container>
    <el-input v-model="name" placeholder="请输入内容" />
    <el-button @click="go">
      跳转
    </el-button>
  </el-container>
</template>
