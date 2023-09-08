import { 
        DefaultImage, SettingsIcon, LocationIcon
        , WorkIcon, TwitterIcon, LinkedInIcon,
        EditIcon
     } from "../utils/constants"

const Profile = () => {
  return (
    <section className="bg-white dark:bg-gray-900 px-10 py-8 h-fit rounded-2xl dark:text-white">
        <div>
            <div className="flex gap-4 justify-between items-center">
                <div className="flex items-center gap-7">
                    <img src={DefaultImage} alt="default image" width={60} className="rounded-full" />
                    <div className="leading-4">
                        <h1 className="text-base font-semibold">John Doe</h1>
                        <span className="text-sm">0 friends</span>
                    </div>
                </div>
                <div className="">
                    <SettingsIcon className="text-lg" />
                </div>
            </div>
            <hr className="mt-5" />
        </div>
        <div> 
            <div className="flex gap-3 mt-4 mb-3 ms-4">
                <LocationIcon className="text-xl" />
                <span className="text-gray-500 text-sm">fake location</span>
            </div>
            <div className="flex gap-3 ms-4">
                <WorkIcon className="text-xl" />
                <span className="text-gray-500 text-sm">fake job</span>
            </div>
            <hr className="mt-5"/>
        </div>
        <div className="mt-4">
            <div className="flex justify-between ms-4 mb-3">
                <span className="text-gray-500">Who's viewed your profile</span>
                <span>75</span>
            </div>
            <div className="flex justify-between ms-4">
                <span className="text-gray-500">Impressions of your post</span>
                <span>75</span>
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
