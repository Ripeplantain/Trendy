import { useCallback } from "react";
import { likePost } from "../services/post";
import { setNotifications } from "../state/features/userSlice"
import { likeAction } from "../state/features/postSlice"
import { useDispatch } from "react-redux";
import { ServerError } from "../utils/types/errorType";


const useLikePost = () => {
    const dispatch = useDispatch()

    const setLike = useCallback(async (id: number) => {
        try {
            const response = await likePost(id)
            dispatch(setNotifications(['Post liked successfully']))
            dispatch(likeAction({ post_id: id }))
            return response
        } catch (error) {
            const err = error as ServerError
            dispatch(setNotifications([err.response.data.detail]))
        }
    }, [dispatch])
    return { setLike }
}


export default useLikePost