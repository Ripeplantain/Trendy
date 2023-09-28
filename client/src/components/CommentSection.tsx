
import React from 'react'
import { PostState } from '../utils/types/stateTypes'
import { DJANGO_BASE_URL } from "../utils/constants"
import { DefaultImage } from '../utils/constants'

interface Prop {
    post: PostState
}

const CommentSection: React.FC<Prop> = ({post}) => {

    const base_url = DJANGO_BASE_URL
    post.post_comments.map((comment) => {
        console.log(comment)
    })

  return (
    <div className='flex items-center my-4 gap-4 border-t pt-4'>
        {/* {post.post_comments ? post.post_comments.map((comment, index) => (
            <div key={index + 1} className='flex items-center gap-4'> */}
                {/* <img
                    className='w-10 h-10 rounded-full'
                    src={comment.user.profile_picture ? base_url + comment.user.profile_picture.file : DefaultImage} alt="profile-image" />
                <div>
                    <p className='text-sm font-semibold'>{comment.user.first_name} {comment.user.last_name}</p>
                    <p className='text-sm'>{comment.comment}</p>
                </div> */}
            {/* </div>
        )) : null} */}
        {/* <img
            className='w-10 h-10 rounded-full'
            src={post.user.profile_picture ? base_url + post.user.profile_picture.file : DefaultImage} alt="profile-image" />
        <div>
            <p className='text-sm font-semibold'>{post.user.first_name} {post.user.last_name}</p>
            <p className='text-sm'>{post.post_comments.comment}</p>
        </div> */}
    </div>
  )
}

const MermoisedCommentSection = React.memo(CommentSection)
export default MermoisedCommentSection
