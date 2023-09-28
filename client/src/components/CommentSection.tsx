
import React from 'react'
import { PostState } from '../utils/types/stateTypes'
import { DJANGO_BASE_URL } from "../utils/constants"
import { DefaultImage } from '../utils/constants'
import { useSelector } from 'react-redux'
import { selectUser } from '../state/features/userSlice'

interface Prop {
    post: PostState
}

const CommentSection: React.FC<Prop> = ({post}) => {

    const base_url = DJANGO_BASE_URL
    const user = useSelector(selectUser)

  return (
    <div className="flex flex-col gap-4 mt-5 border-2 p-4">
        {post.post_comments ? post.post_comments.map((comment, index) => (
            <div key={index + 1} 
                className={`flex items-center gap-4 p-4 rounded-lg w-fit ${
                    comment.user.email === user?.email && 'bg-gray-200 dark:bg-gray-800 ms-auto'
                }`}
                >
                <img
                    className='w-[60px] h-[60px] rounded-full'
                    src={comment.user.profile_picture ? base_url + comment.user.profile_picture.file : DefaultImage} alt="profile-image" />
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-semibold'>{comment.user.first_name} {comment.user.last_name}</p>
                    <p className='text-sm'>{comment.comment}</p>
                </div>
            </div>
        )) : null}
    </div>
  )
}

const MermoisedCommentSection = React.memo(CommentSection)
export default MermoisedCommentSection
