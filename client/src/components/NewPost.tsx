import { 
    DefaultImage, UploadImageIcon, DJANGO_BASE_URL
} from '../utils/constants'

import  { useSelector, useDispatch } from 'react-redux'
import { selectUser, setNotifications } from '../state/features/userSlice'
import { PostModal } from '.'

import useSendPost from '../custom/useSendPost'
import { useRef, useState } from 'react'

const NewPost = () => {

    const user = useSelector(selectUser)
    const {status , setPost, setStatus} = useSendPost()
    const postRef = useRef<HTMLInputElement>(null)
    const [showPostModal, setShowPostModal] = useState(false)
    const dispatch = useDispatch()
    const baseUrl = DJANGO_BASE_URL

    const handleOnClose = () => setShowPostModal(false)

    const handlePostSubmit  = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (status === 201){
            dispatch(setNotifications(['Post created successfully']))
            setStatus(0)
        } else if (status === 400) {
            dispatch(setNotifications(['Post content is required']))
            setStatus(0)
        } else if (status === 500) {
            dispatch(setNotifications(['Something went wrong']))
            setStatus(0)
        }


        const postForm = new FormData()
        if(postRef.current?.value === '') {
            dispatch(setNotifications(['Post content is required']))
            return
        }
        postForm.append('content', postRef.current?.value as string)
        await setPost(postForm)
        postRef.current!.value = ''
    }

  return (
    <section className="bg-white dark:bg-gray-900 px-10 py-8 h-fit rounded-2xl dark:text-white">
        <div className="flex gap-7">
          <img src={user?.profile_picture ? baseUrl + user?.profile_picture.file : DefaultImage} 
                alt="default image" 
                className="w-[70px] rounded-full" />
          <input type="text"
                  className="bg-gray-100 dark:bg-[#333333] rounded-2xl px-5 py-2 w-full"
                  placeholder="What's on your mind"
                  ref={postRef}/>
        </div>

        <hr className='mt-8 mb-5'/>

        <div className='md:flex md:flex-row flex-col justify-around items-center'>
            <div
                onClick={() => setShowPostModal(true)}
                className='mb-2 md:mb-0 flex gap-3 hover:text-orange-600 cursor-pointer'>
                <UploadImageIcon className='text-2xl' />
                <span>Image / Video</span>
            </div>
            <div className='flex gap-3'>
                <button 
                        onClick={handlePostSubmit}
                        className='bg-blue-500 text-white rounded-2xl px-5 py-2 tracking-wider hover:bg-orange-600'>
                    Post
                </button>
            </div>
        </div>

        <PostModal onClose={handleOnClose} visible={showPostModal} />
  </section>
  )
}

export default NewPost
