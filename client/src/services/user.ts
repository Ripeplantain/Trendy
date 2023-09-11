import { privateCall } from "./api";


export const getUser = async () => {
    return await privateCall.get('user/auth/me/');
}

export const getFriends = async () => {
    return await privateCall.get('user/auth/new_friends/');
}