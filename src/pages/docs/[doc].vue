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
import tippy from 'tippy.js'
import { h, render } from 'vue'
import remixiconUrl from '/remixicon.symbol.svg'
import MenuBar from '~/components/MenuBar.vue'

const name = ref('')

const router = useRouter()
// 获取路由参数
const route = useRoute()
const doc = (route.params as { doc: string }).doc
name.value = doc
const menuPost = ref({ left: 0, top: 0 })

const curIcon = ref('paragraph')

const curIsActive = ref(false)
const editor = useEditor({
  content: `
  <h1>Heading 1</h1><p>Paragraph</p><h2>Heading 2</h2><p><strong>bold</strong></p><ol><li><p>sad</p></li><li><p>asda</p></li><li><p>123</p><p><mark>789789</mark></p></li><li><p>l</p></li></ol><ul><li><p>789789</p></li></ul><ul data-type="taskList"><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>6789679</p></div></li></ul><pre><code>789789</code></pre><blockquote><p>789789</p><hr contenteditable="false"><p>789789<br><br class="ProseMirror-trailingBreak"></p></blockquote>
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
  ],
  editable: true, // 是否可编辑
  autofocus: true, // 自动聚焦 就是页面开始时光标会在编辑器中 start在开头 end在结尾  all 选择整个文档
  // 输入规则
  onSelectionUpdate: (e) => {
  // 获取编辑器的状态
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

    // 获取编辑器的视图
    const view = editor?.value?.view as EditorView
    const editorElement = view.dom
    // 初始时拿到编辑器第一行的p标签的坐标

    // 获取编辑器的左边距
    const editorleft = editorElement.offsetLeft
    menuPost.value.left = editorleft - 30

    // 获取选中元素的坐标
    const startCoords = view.coordsAtPos(startPos)

    // const post = view.posAtCoords(startCoords)
    // console.log(post)
    // const res = state.doc.resolve(post.pos)
    // const node = res.nodeAfter
    // console.log('res', res, 'node', node)
    menuPost.value.top = startCoords.top
  },
  onCreate: () => {
    const view = editor?.value?.view as EditorView

    // 初始时拿到编辑器第一行的p标签的坐标
    const initPost = view.coordsAtPos(1)

    menuPost.value.top = initPost.top
    menuPost.value.left = initPost.left - 35
  },
}) as Ref<Editor>

onUnmounted(() => {
  editor?.value?.destroy()
})

const tippyBind = ref<HTMLElement | null>(null)
onMounted(() => {
  if (!tippyBind.value || !editor.value)
    return

  const div = document.createElement('div')
  const el = h(MenuBar, {
    editor: editor.value,
    onAction: (params) => {
      console.log({ params })
      curIcon.value = params.icon
      curIsActive.value = params.isActive
      // console.log('action!', curIcon.value)
    },
  })
  // el 相当于 <MenuBar :editor="editor.value" @action="(icon)=>{xxx} " />
  render(el, div)

  tippy(tippyBind.value, {
    // trigger: 'click',
    hideOnClick: 'toggle',
    interactive: true,
    content: div,
    placement: 'left',
  })
  // 在编辑器元素上添加一个 mousemove 事件监听器
})
</script>

<template>
  <h1>{{ name }}</h1>
  <div class="editor-main">
    <div class="editor">
      <div
        ref="tippyBind"
        :style="{ top: `${menuPost.top}px`, left: `${menuPost.left}px` }"
        class="menu-item"
        :class="{ 'is-active': editor && typeof editor.isActive === 'function' && editor.isActive(curIcon) }"
        fixed
      >
        <svg class="remix">
          <use :xlink:href="`${remixiconUrl}#ri-${curIcon}`" />
        </svg>
      </div>

      <EditorContent v-if="editor" :editor="editor" h="80vh" w="90%" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.remix {
  width: 24px;
  height: 24px;
  fill: #333;
}
.menu-item {
  background: #333;
  border: none;
  border-radius: 0.4rem;
  color: #4d4d4d;
  cursor: pointer;
  height: 1.75rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  width: 1.75rem;
  position: fixed;
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
