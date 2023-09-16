import { 
        DefaultImage, SettingsIcon, LocationIcon
        , WorkIcon, TwitterIcon, LinkedInIcon,
        EditIcon, DJANGO_BASE_URL
     } from "../utils/constants"
import useFetchUser from "../custom/useFetchUser"

import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../state/features/userSlice"


const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const baseUrl = DJANGO_BASE_URL

    useFetchUser(user, dispatch)

  return (
    <section className="bg-white dark:bg-gray-900 px-10 py-8 h-fit rounded-2xl dark:text-white">
        <div>
            <div className="flex gap-4 justify-between items-center">
                <div className="flex items-center gap-7">
                    <img src={user?.profile_picture ? baseUrl + user?.profile_picture.file : DefaultImage} 
                            alt="default image" 
                            width={60} height={60} className="rounded-full" />
                    <div className="leading-4">
                        <h1 className="text-base font-semibold">{user?.first_name} {user?.last_name}</h1>
                        <span className="text-sm">{user?.count_friends} friends</span>
                    </div>
                </div>
                <div className="hover:text-orange-600 cursor-pointer">
                    <SettingsIcon className="text-lg" />
                </div>
            </div>
            <hr className="mt-5" />
        </div>
        <div> 
            <div className="flex gap-3 mt-4 mb-3 ms-4">
                <LocationIcon className="text-xl" />
                <span className="text-gray-500 text-sm">{user?.location}</span>
            </div>
            <div className="flex gap-3 ms-4">
                <WorkIcon className="text-xl" />
                <span className="text-gray-500 text-sm">{user?.occupation}</span>
            </div>
            <hr className="mt-5"/>
        </div>
        <div className="mt-4">
            <div className="flex justify-between ms-4 mb-3">
                <span className="text-gray-500">Number of Posts</span>
                <span>{user?.post_counts}</span>
            </div>
            <div className="flex justify-between ms-4">
                <span className="text-gray-500">Impressions on your post</span>
                <span>{user?.impression_counts}</span>
            </div>
        </div>
        <hr className="mt-5" />
        <div>
            <div className="flex justify-between ms-4 my-5 font-semibold">
                    <span>Social Profiles</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-5 ms-1 items-center">
                    <TwitterIcon className="text-2xl" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Twitter</span>
                        <span className="text-sm text-gray-500">Social Network</span>
                    </div>
                </div>
                <EditIcon className="text-xl" />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-5 ms-1 mt-3 items-center">
                    <LinkedInIcon className="text-2xl" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">LinkedIn</span>
                        <span className="text-sm text-gray-500">Network Platform</span>
                    </div>
                </div>
                <EditIcon className="text-xl" />
            </div>
        </div>
    </section>
  )
}

export default Profile
