import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store'

import { PostState } from '../../utils/types/stateTypes'

const initialState: PostState[] = []

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostState[]>) => {
            return action.payload
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
// export const selectPosts = (state: RootState) => state.posts

export default postSlice.reducer