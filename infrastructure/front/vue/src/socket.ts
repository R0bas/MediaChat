import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  currentMediaChat: null,
})

const URL = import.meta.env.PROD ? undefined : 'http://localhost:3000'

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('mediachat', (...args) => {
  state.currentMediaChat = args[0]
})
