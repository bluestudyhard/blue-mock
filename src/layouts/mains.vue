<!--
 * new page
 * @author: blue
 * @since: 2024-03-17
 * main.vue
-->
<script setup lang="ts"></script>

<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由的子路由 -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped></style>
