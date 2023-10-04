import { useCallback } from "react";
import { postMessage } from "../services/chat";



const useSendMessage = () => {
    
        const sendMessageToServer = useCallback(async (chatRoomId: number | undefined, message: string, sender: number | undefined) => {
            postMessage(chatRoomId, message, sender);
        }, []);
    
        return { sendMessageToServer };
}

export default useSendMessage;