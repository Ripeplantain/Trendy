import { postComment } from "../services/comment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setComment } from "../state/features/postSlice";



function useComment(id: number, comment: string | undefined) {

    const dispatch = useDispatch()

    useEffect(() => {
        const sendComment = async () => {
            try {
                const response = await postComment(id, comment)
                dispatch(setComment({
                    id: id,
                    comments: response.data
                }))
            } catch (error) {
                console.log(error)
            }
        }
        sendComment()
    },[dispatch, id, comment])

}


export default useComment