import { privateCall } from "./api";


export const postComment = async (id: number, comment: string | undefined) => {
    return await privateCall.post(`social/comment/${id}/create_comment/`, { comment });
}