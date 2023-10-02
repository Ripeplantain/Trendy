import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ChatState, MessageState, UserState } from '../../utils/types/stateTypes'


const initialState: ChatState = {
    receiver: null,
    messages: []
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
        }
    },
  })

export const { setReceiver, addMessages, setMessage} = chatSlice.actions

export const selectReceiver = (state: RootState) => state.chat.receiver
export const selectMessages = (state: RootState) => state.chat.messages


export default chatSlice.reducer