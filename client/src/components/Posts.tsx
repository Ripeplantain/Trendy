import { DefaultImage, AddIcon, LikeIcon, MessageIcon } from "../utils/constants"
import { useSelector } from "react-redux"
import { selectPosts } from "../state/features/postSlice"
import useFetchPosts from "../custom/useFetchPosts"
import { DJANGO_BASE_URL } from "../utils/constants"
import useLikePost from "../custom/useLikePost"

const Posts = () => {

  const posts = useSelector(selectPosts)
  const base_url = DJANGO_BASE_URL
  const { setLike } = useLikePost()

  const handleLikeButton = async (id: string) => {
    try {
      await setLike(id)
    } catch(error) {
      console.log(error)
    }
  }

  useFetchPosts()

  return (
    <section>

      {posts.length === 0 && (
        <div className="text-center mt-[5rem]">
            <span className="text-[40px] text-gray-400 font-medium mt-10">No posts yet</span>
        </div>
      )}

      {posts.map((post, index) => (
            <div key={index + 1} className="bg-white dark:bg-gray-900 mt-10 px-10 py-8 h-fit rounded-2xl dark:text-white">
            <div className="flex justify-between items-center">
              <div className="flex gap-5">
                  <img src={post.user.profile_picture ? base_url + post.user.profile_picture.file : DefaultImage} 
                        alt="default image" 
                        className="w-[60px] rounded-full" />
                  <div className="flex flex-col justify-center">
                    <span className="text-sm">{ post.user.first_name } {post.user.last_name}</span>
                    <span className="text-xs">{ post.user.location }</span>
                  </div>
              </div>
              <div className='cursor-pointer'>
                    <AddIcon className='text-2xl text-[#3c6382] delay-100 hover:text-orange-600 dark:hover:text-white' />
              </div>
            </div>
            <div>
              <p className="mt-5">{ post.content }</p>
            </div>
            <div>
                {post.file ? post.file.type === 'image' ? (
                  <img
                    src={base_url + post.file.file}
                    alt="post image"
                    className="w-full md:h-[600px] object-center rounded-xl mt-5"
                  />
                ) : (
                    <video
                          className="w-full object-center rounded-xl mt-5"
                          controls>
                      <source src={base_url + post.file.file} type="video/mp4"/>
                      Your browser does not support the video tag.
                    </video>
                ) : null}
            </div>
            <div>
              <div className="flex items-center mt-5 gap-6 ps-7">
                <div
                    onClick={() => handleLikeButton(post.id)}
                    className="flex gap-3 items-center text-xl border-e-2 pe-5 border-black dark:border-white hover:text-orange-600 cursor-pointer">
                  <LikeIcon
                  />
                  <span className="text-sm">{post.likes.length} likes</span>
                </div>
                <div className="flex gap-3 items-center text-xl hover:text-orange-600 cursor-pointer">
                  <MessageIcon />
                  <span className="text-sm">{post.post_comments.length} comments</span>
                </div>
              </div>
            </div>
          </div>
    ))}
    </section>

  )
}

export default Posts
