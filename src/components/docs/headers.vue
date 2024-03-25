<!--
 * new page
 * @author: blue
 * @since: 2024-03-17
 * header.vue
-->
<script setup lang="ts">
import userStore from '~/stores/user'

const store = userStore()
const route = useRoute()

const { userInfo } = storeToRefs(userStore())
const avatar = computed(() => userInfo.value.avatar)
const headerName = computed(() => (route.params as any).doc)
function logout() {
  store.logout()
  ElMessage.success('退出成功')
  navigateTo('/login')
}
</script>

<template>
  <div class="header" w-full flex justify-between p="y-4" h="20%">
    <h1 w="20%">
      {{ headerName }}
    </h1>
    <div class="avatar w-20% flex justify-end">
      <el-dropdown class="el-dropdown-link">
        <span>
          <el-avatar :size="40" :src="avatar" />
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
    </div>
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
</style>
