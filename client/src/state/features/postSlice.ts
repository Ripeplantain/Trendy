import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { PostState } from '../../utils/types/stateTypes'

const initialState: PostState[] = []

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostState[]>) => {
            state = action.payload
            return state
        },
        addPost: (state, action: PayloadAction<PostState>) => {
            state.unshift(action.payload)
        }
    }
})

export const { setPosts, addPost } = postSlice.actions
export const selectPosts = (state: { post: PostState[] }) => state.post

export default postSlice.reducer