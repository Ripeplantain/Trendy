interface UserState {
    id: number
    first_name: string | null
    last_name: string | null
    email: string 
    occupation: string | null
    profile_picture: FileState | null
    location : string | null
    phone_number: string | null
    friends: UserState[] 
    count_friends: number | null
    post_counts: number | null
    impression_counts: number | null
    exp: number
}

interface FileState {
    purpose: string
    file: string
    type: string
}

interface AuthState {
    access: string | null
    refresh: string | null
    user: UserState | null
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
    id: number
    user: UserState
    content: string
    likes: UserState[]
    likes_count: number
    file: FileState | null
    post_comments: []
    liked: boolean
}



export type {
    UserState,
    AuthState,
    InitialState,
    PostState
}

