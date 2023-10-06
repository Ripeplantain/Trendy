import { DefaultImage, AddIcon } from '../utils/constants'
import useFetchUsers  from '../custom/useFetchUsers'
import useAddFriend from "../custom/useAddFriend"
import { useDispatch, useSelector } from 'react-redux'
import { selectNewFriends } from '../state/features/userSlice'
import React from 'react'


const Info = () => {

  const dispatch = useDispatch()
  const users = useSelector(selectNewFriends)
  const { setAddFriend } = useAddFriend()


  useFetchUsers(dispatch)

  return (
    <div>

      <section className="bg-white dark:bg-gray-900 px-8 py-5 h-fit rounded-2xl dark:text-white">
        <span className='font-medium text-lg'>Gain a new follower</span>
        {users.map((user, index) => (
              <div className='mt-5' key={index + 1}>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-5'>
                    <div>
                      <img src={user.profile_picture ? user.profile_picture : DefaultImage} 
                            alt="profile image" 
                            className='w-[70px] h-[70px] rounded-full' />
                    </div>
                    <div>
                      <h3 className='font-medium mt-3 text-sm'>{user.first_name} {user.last_name}</h3>
                      <p className='text-[14px] text-gray-500 mt-2'>{user.occupation}</p>
                    </div>
                  </div>
                  <div
                    onClick={() => setAddFriend(user.email)}
                      className='cursor-pointer'>
                    <AddIcon className='text-3xl text-[#3c6382] delay-100 hover:text-orange-600 dark:hover:text-orange-600' />
                  </div>
                </div>
              </div>
        ))}
      </section>
    </div>

  )
}

export const MemoizedInfo = React.memo(Info)