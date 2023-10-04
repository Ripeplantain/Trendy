import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ChatState, MessageState, UserState } from '../../utils/types/stateTypes'


const initialState: ChatState = {
    receiver: null,
    messages: [],
    chat_room: '',
    chat_room_id: undefined,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setReceiver: (state, action: PayloadAction<UserState>) => {
            state.receiver = action.payload
        },
        addMessages: (state, action: PayloadAction<MessageState>) => {
            state.messages.push(action.payload)
        },
        setMessage: (state, action: PayloadAction<MessageState[]>) => {
            state.messages = action.payload
        },
        setRoom: (state, action: PayloadAction<string>) => {
            state.chat_room = action.payload
        },
        setRoomId: (state, action: PayloadAction<number>) => {
            state.chat_room_id = action.payload
        },
    },
  })

export const { setReceiver, addMessages, setMessage, setRoom, setRoomId} = chatSlice.actions

export const selectReceiver = (state: RootState) => state.chat.receiver
export const selectMessages = (state: RootState) => state.chat.messages
export const selectRoom = (state: RootState) => state.chat.chat_room
export const selectRoomId = (state: RootState) => state.chat.chat_room_id


export default chatSlice.reducer