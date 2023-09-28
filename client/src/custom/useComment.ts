import { postComment } from "../services/comment";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setComment } from "../state/features/postSlice";
import { setNotifications } from '../state/features/userSlice';




function useComment() {

    const dispatch = useDispatch()

    const sendComment = useCallback(async (id: number, comment: string | undefined) => {
        try {
            const response = await postComment(id, comment)
            dispatch(setComment({
                id: id,
                comments: response.data
            }))
            dispatch(setNotifications(['Comment added successfully']))
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    return { sendComment }
}


export default useComment