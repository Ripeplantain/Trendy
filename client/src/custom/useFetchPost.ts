import { useEffect, useState } from "react";
import { getPost } from "../services/post";
import { PostState } from "../utils/types/stateTypes";


const useFetchPost = (id: string | undefined) => {
    const [post, setPost] = useState<PostState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getPost(id);
            setPost(response.data);
            setLoading(false);
        }
        fetchPost();
    }, [id]);

    return { post, loading };
}

export default useFetchPost;