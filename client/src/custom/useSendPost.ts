import { sendPost } from "../services/post";
import { useCallback, useState } from "react";



function useSendPost() {
    const [status, setStatus] = useState<number>(0)

    const setPost = useCallback(async (data: FormData) => {
        try {
            const response = await sendPost(data)
            setStatus(response.status)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    , [])
    return { setPost, status, setStatus }
}


export default useSendPost