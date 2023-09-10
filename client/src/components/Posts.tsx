import postData from "../utils/dummyData"
import { DefaultImage, AddIcon, LikeIcon, MessageIcon } from "../utils/constants"



const Posts = () => {
  return (
    <section>
      <div className="bg-white dark:bg-gray-900 mt-10 px-10 py-8 h-fit rounded-2xl dark:text-white">
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
              <img src={DefaultImage} alt="default image" className="w-[60px] rounded-full" />
              <div className="flex flex-col justify-center">
                <span className="text-sm">{ postData.owner }</span>
                <span className="text-xs">{ postData.location }</span>
              </div>
          </div>
          <div className='cursor-pointer'>
                <AddIcon className='text-2xl text-[#3c6382] delay-100 hover:text-orange-600 dark:hover:text-white' />
          </div>
        </div>
        <div>
          <p className="mt-5">{ postData.description }</p>
        </div>
        <div>
          <img src={postData.image} alt="post image" className="w-full md:h-[600px] object-center rounded-xl mt-5" />
        </div>
        <div>
          <div className="flex items-center mt-5 gap-6 ps-7">
            <div className="flex gap-3 items-center text-xl border-e-2 pe-5 border-black dark:border-white hover:text-orange-600 cursor-pointer">
              <LikeIcon />
              <span className="text-sm">{postData.likes} likes</span>
            </div>
            <div className="flex gap-3 items-center text-xl hover:text-orange-600 cursor-pointer">
              <MessageIcon />
              <span className="text-sm">{postData.comments} comments</span>
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}

export default Posts
