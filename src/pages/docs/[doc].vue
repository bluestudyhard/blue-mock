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
import BubbleMenu from '@tiptap/extension-bubble-menu'
import TextAlign from '@tiptap/extension-text-align'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import tippy from 'tippy.js'
import { h, render } from 'vue'
import remixiconUrl from '/remixicon.symbol.svg'
import MenuBar from '~/components/MenuBar.vue'

const bubbleMenuRef = ref<HTMLElement>() as Ref<HTMLElement>
const name = ref('')
const tippyBind = ref<HTMLElement >() as Ref<HTMLElement>
const isScrolling = inject('isScrolling') as Ref<boolean>
// 获取路由参数
const route = useRoute()

const ydoc = new Y.Doc()
const doc = (route.params as { doc: string }).doc
name.value = doc
const menuPost = ref({ left: 0, top: 0 })

const curIcon = ref('paragraph')

const curIsActive = ref(false)
const editor = useEditor({
  content: `
 
      `,
  extensions: [
    StarterKit,
    TaskList,
    Highlight,
    TaskItem,
    BubbleMenu.configure({
      element: bubbleMenuRef.value,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
      considerAnyAsEmpty: true,
      placeholder: 'write something...',
    }),
    Collaboration.configure({
      document: ydoc,
    }),
  ],
  editable: true, // 是否可编辑
  autofocus: true, // 自动聚焦 就是页面开始时光标会在编辑器中 start在开头 end在结尾  all 选择整个文档
  // 输入规则

  onSelectionUpdate: (e) => {
    isScrolling.value = false
    tippyBind.value.style.display = 'flex'
    handleActiveNodeType()
    handleNodePostion()
  },
  onCreate: () => {
    initMenuItemPost()
  },
}) as Ref<Editor>

/**
 * @description 获取tippymenu的初始位置
 */
function initMenuItemPost() {
  const view = editor?.value?.view as EditorView

  // 初始时拿到编辑器第一行的p标签的坐标
  const initPost = view.coordsAtPos(1)

  menuPost.value.top = initPost.top
  menuPost.value.left = initPost.left - 35
}
/**
 * @description 获取当前选中的节点类型 并设置icon 手动isActive
 */
function handleActiveNodeType() {
  const state = editor?.value?.state as EditorState
  const selection = state.selection
  const { from: startPos, to: endPos } = selection

  let _cnt = 0
  let firstType = ''
  let lastType = ''
  let level: number | undefined
  state.doc.nodesBetween(startPos, endPos, (node) => {
    if (!level)
      level = node.attrs.level

    // console.log(node)
    if (_cnt === 0)
      firstType = node.type.name
    else
      lastType = node.type.name

    _cnt++
  })
  let type = lastType
  if (lastType === 'paragraph' || lastType === '' || lastType === 'text')
    type = firstType

  console.log(type, level)
  if (type === 'paragraph') {
    curIcon.value = 'paragraph'
  }
  else {
    curIcon.value = menuList.find(({ attrs }) => {
      return attrs?.level === level && attrs?.type === type
    })?.icon || 'paragraph'
  }
}
/**
 * @description 获取每一行编辑器选中的节点的位置
 */
function handleNodePostion() {
  const state = editor?.value?.state as EditorState
  const selection = state.selection
  const { from: startPos } = selection
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
}

async function connectToCollab() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA5NDg2MDEsImV4cCI6MTcxMTAzNTAwMX0.lVTsxjc13NAIzXbSsthW_fziVHK_rJSEWmbsti75N4c'
  const { TiptapCollabProvider } = await import('@hocuspocus/provider')

  const provider = new TiptapCollabProvider({
    name: name.value,
    appId: 'rm8oj29o',
    token,
    document: ydoc,
  })
}
onUnmounted(() => {
  editor?.value?.destroy()
})

onMounted(async () => {
  if (!tippyBind.value || !editor.value)
    return
  await connectToCollab()
  const div = document.createElement('div')
  const el = h(MenuBar, {
    editor: editor.value,
  })
  // el 相当于 <MenuBar :editor="editor.value" @action="(icon)=>{xxx} " />
  render(el, div)

  tippy(tippyBind.value, {
    // trigger: 'click',
    // hideOnClick: 'toggle',
    interactive: true,
    content: div,
    placement: 'left',
  })
  // 拿到editor-main的相对位置
  const editorMain = document.querySelector('.editor-main')
  if (editorMain) {
    const { top, left } = editorMain.getBoundingClientRect()
    console.log(top, left)
  }
})
// 当检测到页面有滚动时，menu-item消失
watchEffect(() => {
  if (isScrolling.value && tippyBind.value)
    tippyBind.value.style.display = 'none'
})
</script>

<template>
  <h2>{{ name }}  </h2>
  <div class="editor-main">
    <BubbleMenu
      v-if="editor"
      ref="bubbleMenuRef"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
        bold
      </button>
      <button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
        italic
      </button>
      <button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
        strike
      </button>
    </BubbleMenu>
    <div class="editor">
      <div
        ref="tippyBind"
        :style="{ top: `${menuPost.top}px`, left: `${menuPost.left}px` }"
        class="menu-item" :class="{ 'is-active': editor && typeof editor.isActive === 'function' && editor.isActive(curIcon) }"
        fixed
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${curIcon}`" />
        </svg>
      </div>
      <!-- <div m="x-8rem">
        <el-input placeholder="请输入内容" />
      </div> -->
      <EditorContent v-if="editor" :editor="editor" min-h="100vh" w="95%" />
    </div>
  </div>
</template>

<style>
h1 {
  font-size: 1.4rem !important;
}
h2 {
  font-size: 1.25rem !important;
}
.ProseMirror {
  min-height: 100vh !important;
  margin: 0 8rem;
  outline: none;
}
</style>

<style scoped lang="scss">
.el-input {
  font-size: 1.8rem;
  height: 3rem;

  outline: none;
  box-shadow: none;
}
.remix {
  width: 24px;
  height: 24px;
  fill: #333;
}

.menu-item {
  background: #fafafa;
  border: none;
  border-radius: 0.4rem;
  color: #5d8dff;
  cursor: pointer;
  height: 1.2rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.2rem;
  position: absolute;
  // top: -1000px;
  // left: -1000px;
  // display: none;

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

.editor-main {
  display: flex;
  width: 100%;
  height: 100vh;

  flex-direction: column;

  .category-tool {
    background-color: #ffffff;
    border-right: 1px solid #e2e8f0;
  }

  .editor {
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    width: 95%;
    align-self: flex-end;
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
  outline-color: none;
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
    background: #7a7a7a;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.9rem;
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
