<!--
 * new page
 * @author: blue
 * @since: 2024-03-07
 * index.vue
-->
<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'

import { EditorContent, useEditor } from '@tiptap/vue-3'
import Placeholder from '@tiptap/extension-placeholder'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'

const appId = import.meta.env.VITE_APP_USER_APP_ID
const token = import.meta.env.VITE_APP_USER_SECRET

const ydoc = new Y.Doc()
const provider = new TiptapCollabProvider({
  name: 'blue',
  appId: 'rm8oj29o',
  token, // 原来是默认用的jwt，没有jwt就无法连接
  document: ydoc,
  connect: false,
})
const editor = useEditor({

  extensions: [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
    Collaboration.configure({
      document: ydoc,

    }),
    CollaborationCursor.configure({
      provider,
      user: {
        name: 'blue',
        color: '#21A3F1',

      },

    }),
    Placeholder.configure({
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',

      placeholder: 'Type / to insert content',
    }),
  ],
})

onMounted(() => {
  // 防止刷新后重复添加初始内容
  provider.connect().then(() => {
    console.log('provider connected')
  })
  if (!ydoc.getMap('config').get('initialContentLoaded') && editor) {
    ydoc.getMap('config').set('initialContentLoaded', true)
    editor.value?.commands.setContent('')
  }
})
</script>

<template>
  <div class="container">
    <div>
      <EditorContent :editor="editor" h="80vh" class="editor" border="1px solid gray" />
    </div>
  </div>
</template>

<style>
/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #3e3e3e;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}
</style>

<style scoped lang="scss">
// @import url(../../styles/style.scss);
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

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
</style>
