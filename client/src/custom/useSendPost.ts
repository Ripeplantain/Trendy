import { sendPost } from "../services/post";
import { useCallback, useState } from "react";
import { addPost } from '../state/features/postSlice'
import { useDispatch } from "react-redux";



function useSendPost() {
    const [status, setStatus] = useState<number>(0)
    const dispatch = useDispatch()

    const setPost = useCallback(async (data: FormData) => {
        try {
            const response = await sendPost(data)
            setStatus(response.status)
            dispatch(addPost(response.data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
    , [dispatch])
    return { setPost, status, setStatus }
}


export default useSendPost