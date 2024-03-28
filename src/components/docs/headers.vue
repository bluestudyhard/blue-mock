<!--
 * new page
 * @author: blue
 * @since: 2024-03-17
 * header.vue
-->
<script setup lang="ts">
import userStore from '~/stores/user'
import { docsToolBar } from '~/constants/docsToolBar'

const store = userStore()
const route = useRoute<'docs-doc'>()
const { userInfo } = storeToRefs(userStore())
const avatar = computed(() => userInfo.value.avatar)

const headerName = computed(() => route.params.doc || '')
const isHome = computed(() => route.path === '/docs')

function logout() {
  store.logout()
  ElMessage.success('退出成功')
  navigateTo('/login')
}
</script>

<template>
  <div
    class="header"
    w-full flex
    p="x-2 y-4" h="full"
    items-center
  >
    <div w="20%" h="full">
      <template v-if="isHome">
        <div absolute w="80%">
          <h1>云盘</h1>
          <DocsToolBar :docs-tool-bar="docsToolBar " />
        </div>
      </template>

      <h1>{{ headerName }}</h1>
    </div>

    <ul class="header-tool-bar h-full w-80% flex items-center justify-end">
      <li><el-icon><ElIconShare /></el-icon></li>
      <li><el-icon><ElIconSearch /></el-icon></li>
      <li>
        <el-dropdown class="el-dropdown-link">
          <span>
            <el-avatar :size="34" :src="avatar" />
          </span>
          <span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<style>
.el-header {
  background-color: #fbfbfb;
  box-shadow: 0px 1px 2px rgb(110 110 110 / 10%);
  height: 5rem;
}
</style>

<style scoped lang="scss">
nav {
  ul {
    list-style: none;
  }
  li {
    display: inline;
    margin-right: 20px;
  }
}
// 解决el-dropdown的外边框问题
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;

  &:focus {
    outline: none !important;
  }

  .el-tooltip__trigger {
    outline: none;
  }
}
.header-tool-bar {
  li {
    margin-left: 20px;
  }
}
</style>
