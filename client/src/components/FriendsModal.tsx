import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../state/features/userSlice'
import { DefaultImage } from '../utils/constants'
import { DJANGO_BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const FriendsModal = () => {

    const user = useSelector(selectUser)
    const baseUrl = DJANGO_BASE_URL
    const navigate = useNavigate()

  return (
    <div
        className="fixed top-[38vh] md:top-16 md:right-[12rem] w-full md:w-80 h-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-xl font-medium mx-auto dark:text-white">Friend List</h3>
        </div>
        <div>
            {user?.friends.map((friend, index) => (
                <div 
                    key={index}
                    onClick={() => navigate(`/chat/${friend.id}`)}
                    className="flex flex-col justify-between items-start p-4 my-2 hover:border cursor-pointer">
                    <div className="flex items-center justify-center w-full gap-4">
                        <img 
                            className='h-10 w-10 rounded-full object-cover'
                            src={friend.profile_picture ? baseUrl + friend.profile_picture : DefaultImage} 
                            alt="prifile picture" />
                        <div className="flex flex-col">
                            <p className="text-md text-gray-500 dark:text-gray-400">{friend.first_name} {friend.last_name}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

const MermoizedFriendsModal = React.memo(FriendsModal)
export default MermoizedFriendsModal
