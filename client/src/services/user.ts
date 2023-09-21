import { privateCall } from "./api";



export const getUser = async () => {
    const response = await privateCall.get('user/auth/me/');
    return response.data;
}

export const getFriends = async () => {
    return await privateCall.get('user/auth/new_friends/');
}

export const addFriend = async (email: string) => {
    await privateCall.post(`user/auth/add_friend/`, null, {
        params: {
            email: email
        }
    });
}