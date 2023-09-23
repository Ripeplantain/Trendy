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
        },
        markRead: (state, action: PayloadAction<number>) => {
            return state.filter(notification => notification.id !== action.payload);
        },
    }
})

export const { addNotifications, markRead } = notificationSlice.actions
export const selectNotification = (state: { notification: NotificatonState[] }) => state.notification

export default notificationSlice.reducer