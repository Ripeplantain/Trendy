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
            for(const post of state) {
                post.showComments = false
            }
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
        },
        showComment: (state, action: PayloadAction<number>) => {
            const post = state.find(post => post.id === action.payload)
            if (post) {
                post.showComments = !post.showComments
            }
        },
        setComment: (state, action: PayloadAction<{id:number, comments:string}>) => {
            const post = state.find(post => post.id === action.payload.id)
            if (post) {
                post.post_comments.push(action.payload.comments)
            }
        }
    }
})

export const { setPosts, addPost, likeAction, showComment, setComment } = postSlice.actions
export const selectPosts = (state: { post: PostState[] }) => state.post

export default postSlice.reducer