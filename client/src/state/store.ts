import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/userSlice'
import postsReducer from './features/postSlice'
import notificationReducer from './features/notificationSlice'
import chatReducer from './features/chatSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    post: postsReducer,
    notification: notificationReducer,
    chat: chatReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch