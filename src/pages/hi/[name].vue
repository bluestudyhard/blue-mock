<script setup lang="ts">
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'


const doc = new Y.Doc()
const wsProvider = new WebsocketProvider('ws://localhost:44444', 'my-roomname', doc)

wsProvider.on('status', (event) => {
  console.log(event.status, doc) // logs "connected" or "disconnected"
})
</script>

<template>
  <div>console</div>
</template>
