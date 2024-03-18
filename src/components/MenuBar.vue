<!--
 * new page
 * @author: blue
 * @since: 2024-03-04
 * MenuBar.vue
-->

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import remixiconUrl from '/remixicon.symbol.svg'

const props = defineProps<{
  editor: Editor
}>()

const menuList = [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: () => props.editor.isActive('bold'),
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: () => props.editor.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: () => props.editor.isActive('strike'),
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => props.editor.chain().focus().toggleCode().run(),
    isActive: () => props.editor.isActive('code'),
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => props.editor.chain().focus().toggleHighlight().run(),
    isActive: () => props.editor.isActive('highlight'),
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 1 }),
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => props.editor.isActive('heading', { level: 2 }),
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: () => props.editor.isActive('paragraph'),
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: () => props.editor.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => props.editor.chain().focus().toggleOrderedList().run(),
    isActive: () => props.editor.isActive('orderedList'),
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => props.editor.chain().focus().toggleTaskList().run(),
    isActive: () => props.editor.isActive('taskList'),
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => {
      try {
        return props.editor.chain().focus().toggleCodeBlock().run()
      }
      catch (e) {
        console.log(`error: ${e}`)
      }
    },
    isActive: () => props.editor.isActive('codeBlock'),
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => props.editor.chain().focus().toggleBlockquote().run(),
    isActive: () => props.editor.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => props.editor.chain().focus().setHorizontalRule().run(),
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => props.editor.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => props.editor.chain()
      .focus()
      .clearNodes()
      .unsetAllMarks()
      .run(),
  },
  {
    icon: 'arrow-go-back-line',
    title: 'Undo',
    action: () => props.editor.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => props.editor.chain().focus().redo().run(),
  },
]
</script>

<template>
  <div class="h-30 w-20 container">
    <div flex w="40" class="flex-wrap">
      <button
        v-for="(item, index) in menuList"
        :key="index"
        class="menu-item-bar"
        :title="item.title"
        @click="() => {
          item.action()
          $emit('action', item.icon)
        }"
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
        </svg>
      </button>
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
.menu-item {
  background: transparent;
  border: none;
  border-radius: 0.4rem;
  color: transparent;
  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;
  position: fixed;
  top: -1000px;
  left: -1000px;
  display: none;

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }

  &.is-active {
    display: block;
    color: #4177f4;
    background-color: #e0e9ff;
  }

  &:hover {
    color: #4177f4;
    background-color: #e0e9ff;
  }
}
</style>
