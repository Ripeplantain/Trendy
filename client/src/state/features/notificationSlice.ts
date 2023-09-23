import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { NotificatonState } from '../../utils/types/stateTypes'

const initialState: NotificatonState[] = []

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotifications: (state, action: PayloadAction<NotificatonState[]>) => {
            state = action.payload
            return state
        }
    }
})

export const { addNotifications } = notificationSlice.actions
export const selectNotification = (state: { post: NotificatonState[] }) => state.post

export default notificationSlice.reducer