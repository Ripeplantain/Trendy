import { useEffect } from "react";
import { getRoom } from "../services/chat";
import { useDispatch } from "react-redux";
import { setRoom, setRoomId } from "../state/features/chatSlice";

const useChatRoom = (sender: number | undefined, receiver: number | undefined) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getChatRoom = async () => {
            const res = await getRoom(sender, receiver);
            console.log(res.data);
            dispatch(setRoom(res.data[0].name));
            dispatch(setRoomId(res.data[0].id));

        }
        getChatRoom();
    }, [sender, receiver, dispatch]);

}


export default useChatRoom;