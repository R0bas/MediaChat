import { reactive, onUnmounted, onMounted, ref, type MaybeRefOrGetter, type MaybeRef, unref } from 'vue'
import { io } from 'socket.io-client'

export function useSocket(roomKey: string) {
  const queue = ref([])
  const state = reactive({
    connected: false,
    currentMediaChat: null,
  })

  const URL = import.meta.env.PROD ? undefined : 'http://localhost:3000'
  const socket = io(URL)

  const getNextMessage = async () => {
    if (queue.value.length === 0) {
      return
    }
    if (queue.value.length === 1) {
      state.currentMediaChat = null
      queue.value = []
    }
    else {
      state.currentMediaChat = queue.value[1]
      queue.value = queue.value.slice(1)
    }
  }

  socket.on('connect', () => {
    console.log('connected')
    state.connected = true
    socket.emit('join', roomKey)
  })

  socket.on('disconnect', () => {
    state.connected = false
  })

  socket.on('mediachat', (...args) => {
    console.log('mediachat', args)
    if (queue.value.length === 0) {
      state.currentMediaChat = args[0]
    }
    queue.value.push(args[0]) 
  })

  socket.on('flush', () => {
    queue.value = []
    state.currentMediaChat = null
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
    state,
    queue,
    socket,
    getNextMessage,
  }
}
