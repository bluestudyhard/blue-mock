<!--
 * new page
 * @author: blue
 * @since: 2024-03-01
 * index.vue
-->

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

// A new Y document
const ydoc = new Y.Doc()
// Registered with a WebRTC provider
const provider = new WebrtcProvider('.editor', ydoc)

const editor = useEditor(
  {
    content: `
        <h2>Welcome to the collaborative editor example</h2>
        <p>This is a simple example of how to build a collaborative editor with Tiptap and Yjs.</p>
      `,
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,

      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: ydoc,
      }),
    ],
  },
)
onMounted(() => {
  provider.awareness.setLocalStateField('user', {
    name: `User ${Math.floor(Math.random() * 100)}`,
  })
  provider.connect()
})
</script>

<template>
  <div class="container">
    <EditorContent :editor="editor" h="80vh" class="editor" />
  </div>
</template>

<style scoped></style>
