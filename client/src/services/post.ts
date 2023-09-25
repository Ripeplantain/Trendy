import { privateCall } from "./api";


export const sendPost = async (data: FormData) => {
    return await privateCall.post('social/post/create_post/', data);
}

export const getPosts = async () => {
    return await privateCall.get('social/post/');
}

export const getPost = async (id: string | undefined) => {
    return await privateCall.get(`social/post/${id}/`);
}


export const likePost = async (id: number ) => {
    return await privateCall.post(`social/post/${id}/like/`);
}