<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import type { Editor } from '@tiptap/vue-3'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import type { EditorView } from 'prosemirror-view'
import type { EditorState } from 'prosemirror-state'
import Placeholder from '@tiptap/extension-placeholder'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'

const doc = new Y.Doc()
const menuPost = ref({ left: 0, top: 0 })

const editor = useEditor({
  content: `

      `,
  extensions: [
    StarterKit,
    TaskList,
    Highlight,
    TaskItem,
    Placeholder.configure({
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
      placeholder: 'Type something...',
    }),
    Collaboration.configure({
      document: doc,

    }),
  ],
  editable: true, // 是否可编辑
  autofocus: true, // 自动聚焦 就是页面开始时光标会在编辑器中 start在开头 end在结尾  all 选择整个文档
  // 输入规则

  onSelectionUpdate: () => {
    // const selection = editor?.value?.state.selection
    // const { from, to } = editor.value.state.selection
    // console.log('selection', selection)
    // const node = editor.value.state.doc
    // console.log('node', node)
    // const view = editor?.value?.view as EditorView

    // // 获取编辑器的内容
    // const content = editor?.value?.state.doc

    // // 遍历每一行元素
    // content.forEach((node, offset) => {
    //   // 获取每一行元素的开始和结束位置
    //   const startPos = offset
    //   const endPos = offset + node.nodeSize

    //   // 获取每一行元素的坐标
    //   const startCoords = view.coordsAtPos(startPos)
    //   const endCoords = view.coordsAtPos(endPos)

    //   console.log('startCoords', startCoords)
    //   console.log('endCoords', endCoords)
    // })

    // 获取编辑器的状态
    const state = editor?.value?.state as EditorState
    // console.log('$doc', editor.value.$doc)
    // console.log('$node', editor.value.$node)
    // console.log('$nodes', editor.value.$nodes)
    // console.log('pos', editor.value.$pos)
    // console.log('view', editor.value.view)
    // console.log('state', editor.value.state)
    // 获取当前选中的元素
    const selection = state.selection

    // 获取选中元素的开始和结束位置
    const startPos = selection.from

    // 获取编辑器的视图
    const view = editor?.value?.view as EditorView
    const editorElement = view.dom
    // 初始时拿到编辑器第一行的p标签的坐标

    // 获取编辑器的左边距

    const editorleft = editorElement.offsetLeft
    menuPost.value.left = editorleft - 30

    // 获取选中元素的坐标
    const startCoords = view.coordsAtPos(startPos)
    menuPost.value.top = startCoords.top
  },
  onCreate: () => {
    const view = editor?.value?.view as EditorView

    // 初始时拿到编辑器第一行的p标签的坐标
    const initPost = view.coordsAtPos(1)
    console.log('initPost', initPost)
    menuPost.value.top = initPost.top
    menuPost.value.left = initPost.left - 35
  },
}) as Ref<Editor>
const menuList = [
  {
    icon: 'bold',
    title: 'Bold',
    action: () => editor?.value?.chain().focus().toggleBold().run(),
    isActive: () => editor?.value?.isActive('bold'),
  },
  {
    icon: 'italic',
    title: 'Italic',
    action: () => editor?.value?.chain().focus().toggleItalic().run(),
    isActive: () => editor?.value?.isActive('italic'),
  },
  {
    icon: 'strikethrough',
    title: 'Strike',
    action: () => editor?.value?.chain().focus().toggleStrike().run(),
    isActive: () => editor?.value?.isActive('strike'),
  },
  {
    icon: 'code-view',
    title: 'Code',
    action: () => editor?.value?.chain().focus().toggleCode().run(),
    isActive: () => editor?.value?.isActive('code'),
  },
  {
    icon: 'mark-pen-line',
    title: 'Highlight',
    action: () => editor?.value?.chain().focus().toggleHighlight().run(),
    isActive: () => editor?.value?.isActive('highlight'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'h-1',
    title: 'Heading 1',
    action: () => editor?.value?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor?.value?.isActive('heading', { level: 1 }),
  },
  {
    icon: 'h-2',
    title: 'Heading 2',
    action: () => editor?.value?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor?.value?.isActive('heading', { level: 2 }),
  },
  {
    icon: 'paragraph',
    title: 'Paragraph',
    action: () => editor?.value?.chain().focus().setParagraph().run(),
    isActive: () => editor?.value?.isActive('paragraph'),
  },
  {
    icon: 'list-unordered',
    title: 'Bullet List',
    action: () => editor?.value?.chain().focus().toggleBulletList().run(),
    isActive: () => editor?.value?.isActive('bulletList'),
  },
  {
    icon: 'list-ordered',
    title: 'Ordered List',
    action: () => editor?.value?.chain().focus().toggleOrderedList().run(),
    isActive: () => editor?.value?.isActive('orderedList'),
  },
  {
    icon: 'list-check-2',
    title: 'Task List',
    action: () => editor?.value?.chain().focus().toggleTaskList().run(),
    isActive: () => editor?.value?.isActive('taskList'),
  },
  {
    icon: 'code-box-line',
    title: 'Code Block',
    action: () => editor?.value?.chain().focus().toggleCodeBlock().run(),
    isActive: () => editor?.value?.isActive('codeBlock'),
  },
  {
    type: 'divider',
  },
  {
    icon: 'double-quotes-l',
    title: 'Blockquote',
    action: () => editor?.value?.chain().focus().toggleBlockquote().run(),
    isActive: () => editor?.value?.isActive('blockquote'),
  },
  {
    icon: 'separator',
    title: 'Horizontal Rule',
    action: () => editor?.value?.chain().focus().setHorizontalRule().run(),
  },
  {
    type: 'divider',
  },
  {
    icon: 'text-wrap',
    title: 'Hard Break',
    action: () => editor?.value?.chain().focus().setHardBreak().run(),
  },
  {
    icon: 'format-clear',
    title: 'Clear Format',
    action: () => editor?.value?.chain()
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
    action: () => editor?.value?.chain().focus().undo().run(),
  },
  {
    icon: 'arrow-go-forward-line',
    title: 'Redo',
    action: () => editor?.value?.chain().focus().redo().run(),
  },
]

watchEffect(() => {
  console.log(menuPost.value)
})

onMounted(async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA3NTQ3NzIsImV4cCI6MTcxMDg0MTE3Mn0.5YmY83UXeLaRCcwk8UE3IlMu9D-D9IB5HPm7J9vbRGQ'
  const { TiptapCollabProvider } = await import('@hocuspocus/provider')

  const provider = new TiptapCollabProvider({
    name: 'blue',
    appId: 'rm8oj29o',
    token,
    document: doc,
  })
})

onUnmounted(() => {
  editor?.value?.destroy()
})
provide('editor', editor)
</script>

<template>
  <div class="editor-main">
    <div class="category-tool">
      侧边工具栏
      <MenuBar />
    </div>

    <div v-if="editor" class="editor">
      <div center justify-start>
        <template v-for="(item, index) in menuList">
          <div
            v-if="item.type === 'divider'"
            :key="`divider${index}`"
            class="divider center"
          />
          <MenuItem
            v-else
            :key="index"
            :icon="item.icon"
            :title="item.title"
            :action="item.action || (() => {})"
            :is-active="item.isActive"
            :menu-pos="menuPost"
          />
        </template>
      </div>

      <EditorContent :editor="editor" h="80vh" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.remix {
  width: 24px;
  height: 24px;
  fill: #333;
}

.editor-main {
  display: flex;
  width: 100%;
  height: 100vh;

  .category-tool {
    width: 20%;
    background-color: #ffffff;
    border-right: 1px solid #e2e8f0;
  }

  .editor {
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    width: 80%;
  }
}
</style>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  border: 1px solid #e2e8f0;
  outline-color: #93b7f4;
  height: 100%;
  padding: 0.2rem;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
