import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReceiver } from "../state/features/chatSlice";
// import { selectUser } from "../state/features/userSlice";
import { setReceiver } from "../state/features/chatSlice";
// import { setNotifications } from "../state/features/userSlice";
import { retrieveUser } from "../services/user";
import { useParams } from "react-router-dom";


const useChatUser = () => {

    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>()
    const receiver = useSelector(selectReceiver)

    useEffect(() => {
        try {
            retrieveUser(id).then(response => {
                dispatch(setReceiver(response.data))
            })
        } catch (error) {
            console.log(error)
        }
    }, [id, dispatch])

    return { receiver}
}


export default useChatUser