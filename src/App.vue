<script setup lang="ts">

</script>

<template>
  <div class="container">
    <nav class="fixed w-100% center" top="0">
      <ul flex justify="center" gap="x-4">
        <li>
          <router-link to="/">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/tiptap">
            TipTap
          </router-link>
        </li>
        <li>
          <router-link to="/collaborative">
            Collaborative
          </router-link>
        </li>
      </ul>
    </nav>
    <main p="x-12 y-12" text="  gray-700 dark:gray-200" bg="white" h="full">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
ol,
ul {
  list-style: none !important;
}
</style>
