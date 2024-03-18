<!--
 * new page
 * @author: blue
 * @since: 2024-03-05
 * Collaborative.vue
-->
<script setup lang="ts">
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

// A new Y document
const ydoc = new Y.Doc()
// Registered with a WebRTC provider
const provider = new WebrtcProvider('example-document', ydoc)

const editor = new Editor({
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
})
</script>

<template>
  <div class="container">
    <div ref="editor" class="editor" />
  </div>
</template>

<style scoped></style>
