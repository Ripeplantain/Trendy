import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { InitialState } from '../../utils/types/stateTypes'

const initialState: InitialState = {
    user: null,
    auth: null,
    darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false'),
    image_id: 0
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<InitialState>) => {
            state.user = action.payload.user
            state.auth = action.payload.auth
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('auth', JSON.stringify(state.auth))
        },
        setLogout: (state) => {
            state.user = null
            state.auth = null
        },
        setFriends: (state, action: PayloadAction<InitialState>) => {
            if (state.user){
                state.user.friends = action.payload.user?.friends
            } else {
                console.error("User doesnt have friends")
            }
        },
        setMode: (state) => {
            state.darkMode = !state.darkMode
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
        },
        setImageId: (state, action: PayloadAction<number>) => {
            state.image_id = action.payload
        }
    }
})

export const { setLogin, setLogout, setFriends, setMode, setImageId } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export const selectDarkMode = (state: RootState) => state.user.darkMode
export const selectImageId = (state: RootState) => state.user.image_id

export default userSlice.reducer