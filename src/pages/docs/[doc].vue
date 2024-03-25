<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3'
import tippy from 'tippy.js'
import { h, render } from 'vue'

import { getEditor } from '~/composables/editor'
import remixiconUrl from '/remixicon.symbol.svg'
import loadingSvg from '/loading.svg'
import MenuBar from '~/components/MenuBar.vue'
import userStore from '~/stores/user'

const route = useRoute()
definePageMeta({
  layout: 'docs',
})
const { token } = storeToRefs(userStore())
const name = ref((route.params as { doc: string }).doc)

const tippyBind = ref<HTMLElement >() as Ref<HTMLElement>
const isScrolling = inject('isScrolling') as Ref<boolean>
const curIcon = ref('paragraph')
const menuPost = ref({ left: 0, top: 0 })

const loading = ref(true)

/**
 * @description 获取编辑器实例
 */

const { editor, ydoc } = getEditor(isScrolling, tippyBind, menuPost, curIcon)

/**
 * @description 初始化tippy
 */
async function init() {
  if (!tippyBind.value || !editor.value)
    return

  const store = userStore()
  token.value = store.getToken()
  // console.log(token.value)
  const div = document.createElement('div')
  const el = h(MenuBar, {
    editor: editor.value!,
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
    // console.log(top, left)
  }
}
async function connectToCollab(name: string) {
  const { TiptapCollabProvider } = await import('@hocuspocus/provider')

  const provider = new TiptapCollabProvider({
    name,
    appId: 'rm8oj29o',
    token: token.value as string,
    document: ydoc,
    onSynced: () => {
      loading.value = true
      if (!ydoc.getMap('config').get('initialContentLoaded') && editor.value) {
        ydoc.getMap('config').set('initialContentLoaded', true)
        editor.value.commands.setContent(`
        `)
      }
    },
  },
  )
}
/*
  * @description watchImmediate的用法是在页面加载时立即执行一次，然后在后续的变化中执行
*/
// watchImmediate(route.params.doc, async () => {
//   await init()
//   editor.value = _editor.value
//   await connectToCollab(name.value)
// })

onMounted(async () => {
  await init()
  await connectToCollab(name.value)
})

// 当检测到页面有滚动时，menu-item消失
watchEffect(() => {
  if (isScrolling.value && tippyBind.value)
    tippyBind.value.style.display = 'none'
})
</script>

<template>
  <div

    class="editor-main"
    element-loading-text="Loading..."
    element-loading-background="#fff"
  >
    <!-- <bubble-menu
      v-if="editor"
      class="bubble-menu"
      :editor="editor"
      :tippy-options="{ duration: 100 }"
    >
      <button :class="{ 'is-active': editor?.isActive('bold') }" @click="editor?.chain().focus().toggleBold().run()">
        Bold
      </button>
      <button :class="{ 'is-active': editor?.isActive('italic') }" @click="editor?.chain().focus().toggleItalic().run()">
        Italic
      </button>
      <button :class="{ 'is-active': editor?.isActive('strike') }" @click="editor?.chain().focus().toggleStrike().run()">
        Strike
      </button>
    </bubble-menu> -->
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
.tippy-box {
  background-color: #ececec;
}

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
