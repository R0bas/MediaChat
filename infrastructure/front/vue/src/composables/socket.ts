import { onUnmounted, onMounted, ref,} from 'vue'


import { io } from 'socket.io-client'
import type { MediaChat } from '@/types'

export function useSocket(roomKey: string) {
  const queue = ref<MediaChat[]>([])
  const connected = ref(false)
  const currentMediaChat = ref<MediaChat | null>(null)


  const URL = "http://localhost:3000";
  const socket = io(URL)

  const getNextMessage = async () => {
    if (queue.value.length === 0) {
      return
    }
    if (queue.value.length === 1) {
      // FLUSH EQUIVALENT
      currentMediaChat.value = null
      queue.value = []
    }
    else {
      currentMediaChat.value = queue.value[1]
      queue.value = queue.value.slice(1)
    }
  }

  socket.on('connect', () => {
    console.log('connected')
    connected.value = true
    socket.emit('join', roomKey)
  })

  socket.on('disconnect', () => {
    connected.value = false
  })

  socket.on('mediachat', (...args) => {
    if (queue.value.length === 0) {
      currentMediaChat.value = args[0]
    }
    queue.value.push(args[0])
  })

  socket.on('flush', () => {
    queue.value = []
    currentMediaChat.value = null
  })

  socket.on('skip', () => {
    getNextMessage()
  })

  onMounted(() => {
    socket.connect()
  })

  onUnmounted(() => {
    socket.disconnect()
  })

  return {
    connected,
    currentMediaChat,
    queue,
    socket,
    getNextMessage,
  }
}
