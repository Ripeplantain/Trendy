
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
    post_comments: CommentState[]
    liked: boolean
    showComments: boolean
}

interface CommentState {
    id: number
    user: UserState
    comment: string
    post: PostState
}


interface NotificatonState {
    id: number
    user: UserState
    post: PostState
    content: string
    is_read: boolean
    type: string
    created_at: string
    updated_at: string
}

interface MessageState {
    message: string
    sender: string
}


interface ChatState {
    receiver: UserState | null
    messages: MessageState[]
    chat_room: string
    chat_room_id: number | undefined
}

export type {
    UserState,
    AuthState,
    InitialState,
    PostState,
    NotificatonState,
    CommentState,
    MessageState,
    ChatState,
}

