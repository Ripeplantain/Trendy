import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { InitialState, AuthState, UserState } from '../../utils/types/stateTypes'

const initialState: InitialState = {
    user: null,
    auth: null,
    darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
    image_id: 0,
    new_friends: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<AuthState>) => {
            state.auth = action.payload
            localStorage.setItem('auth', JSON.stringify(state.auth))
        },
        setLogout: (state) => {
            state.user = null
            state.auth = null
            localStorage.removeItem('auth')
        },
        setMode: (state) => {
            state.darkMode = !state.darkMode
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
        },
        setImageId: (state, action: PayloadAction<number>) => {
            state.image_id = action.payload
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        },
        setNewFriends: (state, action: PayloadAction<UserState[]>) => {
            state.new_friends = action.payload
        }
    }
})

export const { setLogin, setLogout, setMode, setImageId, setUser, setNewFriends } = userSlice.actions
export const selectUser = (state: RootState) => state.user.user
export const selectDarkMode = (state: RootState) => state.user.darkMode
export const selectImageId = (state: RootState) => state.user.image_id
export const selectFriends = (state: RootState) => state.user.user?.friends
export const selectNewFriends = (state: RootState) => state.user.new_friends

export default userSlice.reducer