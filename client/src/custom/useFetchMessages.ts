import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setMessage } from "../state/features/chatSlice"
import { getMessages } from "../services/chat"
import { UserState } from "../utils/types/stateTypes"


const useFetchMessages = (chatRoomId: number | undefined) => {
    
        const dispatch = useDispatch();
    
        useEffect(() => {
            const fetchMessages = async () => {
                const res = await getMessages(chatRoomId);
                const messages = res.data.map(({ message, sender }: { message: string; sender: UserState }) => ({
                    message,
                    sender: sender.email
                  }));
                console.log('messages', messages);
                dispatch(setMessage(messages));
                
            }
            fetchMessages();
        }, [chatRoomId, dispatch]);
    
}

export default useFetchMessages;

