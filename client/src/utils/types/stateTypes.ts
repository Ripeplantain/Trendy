interface UserState {
    id: number
    first_name: string | null
    last_name: string | null
    email: string | null
    occupation: string | null
    profile_picture: FileState | null
    location : string | null
    phone_number: string | null
    friends: UserState[] | undefined
    count_friends: number | null
    post_counts: number | null
    impression_counts: number | null
}

interface FileState {
    purpose: string
    file: string
    type: string
}

interface AuthState {
    refresh: string
    access: string
}

interface InitialState {
    user: UserState | null
    auth: AuthState | null
    darkMode: boolean
    image_id: number 
    new_friends: UserState[]
    notifications: string[]
}

interface PostState {
    id: string
    user: UserState
    content: string
    likes: UserState[]
    file: FileState | null
    post_comments: []
}



export type {
    UserState,
    AuthState,
    InitialState,
    PostState
}

