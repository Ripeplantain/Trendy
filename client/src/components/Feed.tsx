import {
  NewPost, Posts
} from '../components'
import React from 'react'


const Feed = () => {
  return (
    <div>
      <NewPost />
      <Posts />
    </div>
  )
}

export const MemoizedFeed = React.memo(Feed)