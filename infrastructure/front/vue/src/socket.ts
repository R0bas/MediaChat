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
  console.log(socket)
  socket.on('connect', () => {
    state.connected = true
    socket.emit('join', roomKey)
  })

  socket.on('disconnect', () => {
    state.connected = false
  })

  socket.on('mediachat', (...args) => {
    state.queue.push(args)
    
  })
  onMounted(() => {
    socket.connect()
  })

  onUnmounted(() => {
    socket.disconnect()
  })

  return {
    state,
    socket,
  }
}
