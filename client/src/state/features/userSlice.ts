import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { InitialState, AuthState, UserState } from '../../utils/types/stateTypes'
import { getUser } from '../../services/user'


export const fetchUser = createAsyncThunk(
    'user/fetchUser', () => getUser()
)

const initialState: InitialState = {
    user: null,
    auth: JSON.parse(localStorage.getItem('auth') || 'null'),
    darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
    image_id: '',
    new_friends: [],
    notifications: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload
        }
    },
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
        setImageId: (state, action: PayloadAction<string>) => {
            state.image_id = action.payload
        },
        setNewFriends: (state, action: PayloadAction<UserState[]>) => {
            state.new_friends = action.payload
        },
        setNotifications: (state, action: PayloadAction<string[]>) => {
            state.notifications = action.payload
        },
    }
})

export const { setLogin, setLogout, setMode, setImageId, setNewFriends, setNotifications} = userSlice.actions
export const selectUser = (state: RootState) => state.user.user
export const selectDarkMode = (state: RootState) => state.user.darkMode
export const selectImageId = (state: RootState) => state.user.image_id
export const selectFriends = (state: RootState) => state.user.user?.friends
export const selectNewFriends = (state: RootState) => state.user.new_friends
export const selectNotifications = (state: RootState) => state.user.notifications
export const selectAuth = (state: RootState) => state.user.auth


export default userSlice.reducer