import { Navbar } from "../components";
import { useParams } from "react-router-dom";


const PostDetails: React.FC = () => {

    const { id } = useParams()
    console.log(id)

    return (
        <div>
            <Navbar />
            {/* <p>Will be added in the next update</p> */}
            <div
                className="flex h-screen justify-center items-center"
            >
                <span className="text-3xl uppercase tracking-wider text-gray-600">Will be added in the next update</span>
            </div>
        </div>
    )
}

export default PostDetails