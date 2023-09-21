import { DefaultImage, AddIcon, LikeIcon, MessageIcon, FriendIcon } from "../utils/constants"
import { useSelector } from "react-redux"
import { selectPosts } from "../state/features/postSlice"
import { selectUser } from "../state/features/userSlice"
import useFetchPosts from "../custom/useFetchPosts"
import { DJANGO_BASE_URL } from "../utils/constants"
import useLikePost from "../custom/useLikePost"
import { PostState } from "../utils/types/stateTypes"
import { Top } from "../components"
import useAddFriend from "../custom/useAddFriend"
import { UserState } from "../utils/types/stateTypes"

const Posts = () => {

  const posts = useSelector(selectPosts)
  const base_url = DJANGO_BASE_URL
  const { setLike } = useLikePost()
  const { setAddFriend } = useAddFriend()
  const user = useSelector(selectUser)
  // console.log(user)

  const handleLikeButton = async (post: PostState) => {
    try {
      await setLike(post.id)
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

      <Top />

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
              {
                post.user.friends.some(
                  (friend: UserState) => friend.email === user?.email
                ) ? (
                  <div>
                    <FriendIcon className='text-2xl text-[#3c6382] delay-100' />
                  </div>
                ) : (
                  <div
                  onClick={() => setAddFriend(post.user.email)}
                className='cursor-pointer'>
                  <AddIcon className='text-2xl text-[#3c6382] delay-100 hover:text-orange-600 dark:hover:text-white' />
                </div>
                )
              }
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
                {
                  !post.liked ? (
                    <div
                    onClick={() => handleLikeButton(post)}
                    className="flex gap-3 items-center text-xl border-e-2 pe-5 border-black dark:border-white hover:text-orange-600 cursor-pointer">
                    <LikeIcon
                    />
                    <span className="text-sm">{post.likes_count} likes</span>
                    </div>
                  ) : (
                    <div
                    onClick={() => handleLikeButton(post)}
                    className="flex gap-3 items-center text-xl border-e-2 pe-5 border-black dark:border-white text-orange-600 cursor-pointer">
                    <LikeIcon
                    />
                    <span className="text-sm">{post.likes_count} likes</span>
                    </div>
                  )
                }
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
