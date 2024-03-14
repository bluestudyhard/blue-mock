<!--
 * new page
 * @author: blue
 * @since: 2024-03-07
 * index.vue
-->
<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'

// import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()
const provider = new TiptapCollabProvider({
  name: 'blue',
  appId: 'rm8oj29o',
  token: '1c1a5208b1430a17eb4e1b8beef9340eb3b81edc433e35928d811a017437c698',
  document: ydoc,
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
        name: 'Cyndi Lauper',
        color: '#f783ac',
      },
    }),
  ],
})
onMounted(() => {
  provider.connect()

  provider.on('status', (status) => {
    console.log('status', status)
  })
  // 防止刷新后重复添加初始内容
  if (!ydoc.getMap('config').get('initialContentLoaded') && editor) {
    ydoc.getMap('config').set('initialContentLoaded', true)
    editor.value?.commands.setContent('<p>Initial content</p>')
  }
})
</script>

<template>
  <div class="container">
    <div>
      <EditorContent :editor="editor" h="80vh" class="editor" />
    </div>
  </div>
</template>

<style scoped lang="scss">
// @import url(../../styles/style.scss);
</style>
