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
            const updatedPosts = state.map((post) => {
                if (post.id === action.payload.id) return action.payload
                return post
            })
            state = updatedPosts
        }
    }
})

export const { setPosts, addPost } = postSlice.actions
export const selectPosts = (state: { post: PostState[] }) => state.post

export default postSlice.reducer