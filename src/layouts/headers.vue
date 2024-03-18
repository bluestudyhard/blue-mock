<!--
 * new page
 * @author: blue
 * @since: 2024-03-17
 * header.vue
-->
<script setup lang="ts">
const headerName = ref('主页')
</script>

<template>
  <div class="header" p="y-4" h="20%">
    <h1>
      {{ headerName }}
    </h1>
    <nav class="fixed center" top="0" right="0">
      <ul flex justify="center" gap="x-4">
        <li>
          <router-link to="/docs">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/docs/tiptap">
            TipTap
          </router-link>
        </li>
        <li>
          <router-link to="/collaborative">
            Collaborative
          </router-link>
        </li>
        <li>
          <router-link to="/personal">
            Personal
          </router-link>
        </li>
      </ul>
    </nav>
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
</style>
