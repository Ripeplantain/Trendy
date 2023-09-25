import { useEffect } from "react";
import { getPosts } from '../services/post'
import { setPosts } from "../state/features/postSlice";
import { useDispatch } from "react-redux";


function useFetchPosts() {

    const dispatch = useDispatch()


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