interface UserState {
    firstName: string | null
    lastName: string | null
    email: string | null
    occupation: string | null
    profilePicture: string | null
    location : string | null
    phoneNumber: string | null
    friends: UserState[] | undefined
}

interface AuthState {
    refreshToken: string | null
    accessToken: string | null
}

interface InitialState {
    user: UserState | null
    auth: AuthState | null
}

interface PostState {
    id: string
    user: UserState
    content: string
    likes: number
}


export {
    UserState,
    AuthState,
    InitialState,
    PostState
}