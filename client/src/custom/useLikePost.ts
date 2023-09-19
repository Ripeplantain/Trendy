import { useCallback } from "react";
import { likePost } from "../services/post";
import { setNotifications } from "../state/features/userSlice"
import { useDispatch } from "react-redux";
import { ServerError } from "../utils/types/errorType";


const useLikePost = () => {
    const dispatch = useDispatch()

    const setLike = useCallback(async (id: string) => {
        try {
            const response = await likePost(id)
            dispatch(setNotifications(['Post liked successfully']))
            return response
        } catch (error) {
            const err = error as ServerError
            dispatch(setNotifications([err.response.data.detail]))
        }
    }, [dispatch])
    return { setLike }
}


export default useLikePost