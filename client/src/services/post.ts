import { privateCall } from "./api";


export const sendPost = async (data: FormData) => {
    return await privateCall.post('social/post/create_post/', data);
}