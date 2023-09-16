import { Dispatch, useEffect } from "react";
import { getPosts } from '../services/post'
import { PostState } from "../utils/types/stateTypes";
import { setPosts } from "../state/features/postSlice";
import { useDispatch } from "react-redux";

interface Payload {
    type: string
    payload: PostState[]
}


function useFetchPosts() {

    const dispatch: Dispatch<Payload> = useDispatch()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts()
                dispatch(setPosts(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    }, [dispatch])

}

export default useFetchPosts