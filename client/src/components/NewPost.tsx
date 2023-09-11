import { 
    DefaultImage, UploadImageIcon, VideoIcon,
    DocumentIcon, AudioIcon
} from '../utils/constants'

import  { useSelector } from 'react-redux'
import { selectUser } from '../state/features/userSlice'


const NewPost = () => {

    const user = useSelector(selectUser)

  return (
    <section className="bg-white dark:bg-gray-900 px-10 py-8 h-fit rounded-2xl dark:text-white">
        <div className="flex gap-7">
          <img src={user?.profile_picture ? user?.profile_picture.file : DefaultImage} 
                alt="default image" 
                className="w-[70px] rounded-full" />
          <input type="search"
                  className="bg-gray-100 dark:bg-[#333333] rounded-2xl px-5 py-2 w-full"
                  placeholder="What's on your mind" />
        </div>

        <hr className='mt-8 mb-5'/>

        <div className='md:flex md:flex-row flex-col justify-between items-center'>
            <div className='mb-2 md:mb-0 flex gap-3 hover:text-orange-600 cursor-pointer'>
                <UploadImageIcon className='text-2xl' />
                <span>Image</span>
            </div>
            <div className='mb-2 md:mb-0 flex gap-3 hover:text-orange-600 cursor-pointer'>
                <VideoIcon className='text-2xl' />
                <span>Clip</span>
            </div>
            <div className='mb-2 md:mb-0 flex gap-3 hover:text-orange-600 cursor-pointer'>
                <DocumentIcon className='text-2xl' />
                <span>Attachment</span>
            </div>
            <div className='mb-2 md:mb-0 flex gap-3 hover:text-orange-600 cursor-pointer'>
                <AudioIcon className='text-2xl' />
                <span>Audio</span>
            </div>
            <div className='flex gap-3'>
                <button className='bg-blue-500 text-white rounded-2xl px-5 py-2 tracking-wider hover:bg-orange-600'>
                    Post
                </button>
            </div>
        </div>
  </section>
  )
}

export default NewPost
