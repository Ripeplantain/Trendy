import { privateCall } from "./api";

export const getNotifications = async () => {
    return await privateCall.get('notification/user/');
}