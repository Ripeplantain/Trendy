export interface AuthProp {
    mode: 'light' | 'dark';
    user: UserProp | null;
    token: TokenProp | null;
    posts: PostProp[]
}

export interface UserProp {
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    location: string | null;
    occupation: string | null;
    friends : [] | null;
}

export interface TokenProp {
    refresh: string | null;
    access: string | null;
}

export interface PostProp {
    id: number | null;
    content: string | null;
}


