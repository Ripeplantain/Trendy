import { privateCall } from "./api";


export const sendPost = async (data: FormData) => {
    return await privateCall.post('social/post/create_post/', data);
}

export const getPosts = async () => {
    return await privateCall.get('social/post/');
}


export const likePost = async (id: string ) => {
    return await privateCall.post(`social/post/${id}/like/`);
}