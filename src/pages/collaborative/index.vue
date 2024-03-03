<!--
 * new page
 * @author: blue
 * @since: 2024-03-01
 * index.vue
-->
<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
  content: '<p>Hello, World!</p>',
  extensions: [
    StarterKit,
  ],
  editable: true, // 是否可编辑
  autofocus: true, // 自动聚焦 就是页面开始时光标会在编辑器中 start在开头 end在结尾  all 选择整个文档
  // 输入规则

})
</script>

<template>
  <div class="container">
    <MenuBar class="editor__header" :editor?="editor" />
    <Editor />
  </div>
</template>

<style scoped></style>
