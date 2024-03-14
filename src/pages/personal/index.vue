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

const ydoc = new Y.Doc()
const provider = new TiptapCollabProvider({
  name: 'blue',
  appId: 'rm8oj29o',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTA0MzA3NDIsIm5iZiI6MTcxMDQzMDc0MiwiZXhwIjoxNzEwNTE3MTQyLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJybThvajI5byJ9.QU-ZbTC6YsAK5rOjPMxq9QRwn0UyAH3e7bbUPoLi0mU', // 原来是默认用的jwt，没有jwt就无法连接
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
// import { WebsocketProvider } from 'y-websocket'

onMounted(() => {
  provider.connect()

  provider.on('status', (status) => {
    console.log('status', status)
  })
  // 防止刷新后重复添加初始内容
  if (!ydoc.getMap('config').get('initialContentLoaded') && editor) {
    ydoc.getMap('config').set('initialContentLoaded', true)
    editor.value?.commands.setContent('')
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
