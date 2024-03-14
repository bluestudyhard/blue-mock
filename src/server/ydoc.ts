import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()

const provider = new WebsocketProvider('http://localhost:3000/blue', 'my-document-name', ydoc, {
  WebSocketPolyfill: WebSocket,
})

provider.on('status', (event: { status: string }) => {
  console.log('y-websocket status:', event.status)
})

provider.on('update', (update: Uint8Array, origin: any) => {
  console.log('y-websocket update:', update, origin)
})
