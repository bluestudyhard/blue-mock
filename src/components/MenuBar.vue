<!--
 * new page
 * @author: blue
 * @since: 2024-03-04
 * MenuBar.vue
-->

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import remixiconUrl from '/remixicon.symbol.svg'

const editor = inject<Ref<Editor>>('editor')!
const menuList = [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => editor?.value.chain().focus().toggleBold().run(),
    isActive: () => editor?.value.isActive('bold'),
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => editor.value.chain().focus().toggleItalic().run(),
    isActive: () => editor.value.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => editor.value.chain().focus().toggleStrike().run(),
    isActive: () => editor.value.isActive('strike'),
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => editor.value.chain().focus().toggleCode().run(),
    isActive: () => editor.value.isActive('code'),
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => editor.value.chain().focus().toggleHighlight().run(),
    isActive: () => editor.value.isActive('highlight'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.value.isActive('heading', { level: 1 }),
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.value.isActive('heading', { level: 2 }),
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => editor.value.chain().focus().setParagraph().run(),
    isActive: () => editor.value.isActive('paragraph'),
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => editor.value.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => editor.value.chain().focus().toggleOrderedList().run(),
    isActive: () => editor.value.isActive('orderedList'),
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => editor.value.chain().focus().toggleTaskList().run(),
    isActive: () => editor.value.isActive('taskList'),
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => editor.value.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor.value.isActive('codeBlock'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => editor.value.chain().focus().toggleBlockquote().run(),
    isActive: () => editor.value.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => editor.value.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => editor.value.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => editor.value.chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => editor.value.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => editor.value.chain().focus().redo().run(),
  },
]
</script>

<template>
  <div class="h-30 w-20 container">
    <div flex w="40" class="flex-wrap">
      <template v-for="(item, index) in menuList">
        <div v-if="item.type === 'divider'" :key="`divider${index}`" class="divider" center />
        <button
          v-else :key="index" class="menu-item-bar" :class="{ 'is-active': isActive ? item.isActive : false }"
          :title="item.title" @click="item.action"
        >
          <svg class="remix">
            <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
          </svg>
        </button>
      <!-- <MenuItem v-if="selectedNodeType === item.icon" :key="index" :icon="item.icon" :title="item.title" :action="item.action" :is-active="item.isActive" /> -->
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-item-bar {
  background: #f6f9f9;
  color: #252525;
  border: none;
  border-radius: 0.4rem;

  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active,
  &:hover {
    color: #4177f4;
    background-color: #e0e9ff;
  }
}
</style>
