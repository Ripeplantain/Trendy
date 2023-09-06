import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store'


import { InitialState } from '../../utils/types/stateTypes'

const initialState: InitialState = {
    user: null,
    auth: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<InitialState>) => {
            state.user = action.payload.user
            state.auth = action.payload.auth
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
        }
    }
})

export const { setLogin, setLogout, setFriends } = userSlice.actions
// export const selectUser = (state: RootState) => state.user

export default userSlice.reducer