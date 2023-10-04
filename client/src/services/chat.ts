import { privateCall } from "./api";


export const getRoom = async (sender: number | undefined, receiver: number | undefined) => {
    return await privateCall.get(`chat/chat-rooms/get_chat_room/?sender=${sender}&receiver=${receiver}`);
}

export const getMessages = async (chatRoomId: number | undefined) => {
    return await privateCall.get(`chat/chat-rooms/fetch_messages/?chat_room=${chatRoomId}`);
}

export const postMessage = async (chatRoomId: number | undefined, message: string, sender: number | undefined) => {
    return await privateCall.post(`chat/chat-rooms/send_message/`, {
        chat_room: chatRoomId,
        message: message,
        sender: sender
    });
}