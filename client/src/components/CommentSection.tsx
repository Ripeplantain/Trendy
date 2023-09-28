
import React from 'react'
import { PostState } from '../utils/types/stateTypes'
import { DJANGO_BASE_URL } from "../utils/constants"
import { DefaultImage } from '../utils/constants'

interface Prop {
    post: PostState
}

const CommentSection: React.FC<Prop> = ({post}) => {

    const base_url = DJANGO_BASE_URL
    console.log(post.post_comments)


  return (
    <div className='flex flex-col gap-4 mt-5'>
        {post.post_comments ? post.post_comments.map((comment, index) => (
            <div key={index + 1} className='flex items-center gap-4'>
                <img
                    className='w-[60px] h-[60px] rounded-full'
                    src={comment.user.profile_picture ? base_url + comment.user.profile_picture.file : DefaultImage} alt="profile-image" />
                <div>
                    <p className='text-sm font-semibold'>{comment.user.first_name} {comment.user.last_name}</p>
                    <p className='text-xs'>{comment.comment}</p>
                </div>
            </div>
        )) : null}
    </div>
  )
}

const MermoisedCommentSection = React.memo(CommentSection)
export default MermoisedCommentSection
