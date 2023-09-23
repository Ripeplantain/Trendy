import { privateCall } from "./api";

export const getNotifications = async () => {
    return await privateCall.get('notification/user/');
}


export const markAsRead = async (id: number) => {
    return await privateCall.post(`notification/user/${id}/read_notification/`);
}