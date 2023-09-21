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
        },
        likeAction: (state, action: PayloadAction<{post_id: number}>) => {
            const post = state.find(post => post.id === action.payload.post_id)
            if (post) {
                post.likes_count += 1
                post.liked = true
            }
        }
    }
})

export const { setPosts, addPost, likeAction } = postSlice.actions
export const selectPosts = (state: { post: PostState[] }) => state.post

export default postSlice.reducer