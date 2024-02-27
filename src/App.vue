<template>
  <main font-sans p="x-4 y-10" text="center  gray-700 dark:gray-200" bg="white" h="full">
    <nav class="fixed w-full center" top="0">
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
      </ul>
    </nav>
    <RouterView />
  </main>
</template>
