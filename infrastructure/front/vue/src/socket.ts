import { reactive, onUnmounted, onMounted } from 'vue'
import { io } from 'socket.io-client'

export function useSocket( roomKey: string) {
  const state = reactive({
    connected: false,
    currentMediaChat: null,
    queue: [],
  })

  const URL = import.meta.env.PROD ? undefined : 'http://localhost:3000'
  const socket = io(URL)
  socket.on('connect', () => {
    state.connected = true
    socket.emit('join', roomKey)
  })

  socket.on('disconnect', () => {
    state.connected = false
  })

  socket.on('mediachat', (...args) => {   
    console.log('mediachat', args[0])
    if (state.queue.length === 0) {
      state.currentMediaChat = args[0]
    }
    else {
      state.queue.push(args[0])
    }
   
  })

  onMounted(() => {
    socket.connect()
  })

  onUnmounted(() => {
    socket.disconnect()
  })

  const next = () => {
    console.log('next', state.queue)
    state.currentMediaChat = state.queue.shift() || null
  }

  return {
    state,
    socket,
    next,
  }
}
