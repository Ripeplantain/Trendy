import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthProp, UserProp, TokenProp, PostProp } from '../types';

const initialState: AuthProp = {
    mode: 'light',
    user: null,
    token: null,
    posts: []
}

export const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action: PayloadAction<{user: UserProp, token: TokenProp}>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action: PayloadAction<{friends: []}>) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error('User not found');
            }
        },
        setPosts: (state, action: PayloadAction<{posts: []}>) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action: PayloadAction<{post: PostProp}>) => {
            const updatedPosts  = state.posts.map((post: PostProp) => {
                if (post.id === action.payload.post.id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;