import { MouseEvent, useRef } from "react"
import { CloseIcon, DefaultImage } from "../utils/constants"

import { useSelector } from "react-redux"
import { selectUser } from "../state/features/userSlice"

interface ModalProp {
    visible: boolean
    onClose: () => void
}


const PostModal: React.FC<ModalProp> = ({visible, onClose}) => {

    const postRef = useRef<HTMLInputElement>(null)
    const user = useSelector(selectUser)

    const handleOnClose = (e: MouseEvent) => {
        if (e.target instanceof HTMLDivElement && e.target.id === "container") {
          onClose();
        }
      };


  return (
    <>
        {visible && (
            <div 
                id="container"
                onClick={handleOnClose}
                className="fixed inset-0 b bg-black 
                            bg-opacity-30 backdrop-blur-sm
                            flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-900 p-2 rounded">
                        <div className="flex justify-between items-center text-3xl py-6 border-b border-gray-50">
                            <h3>Create Post</h3>
                            <CloseIcon
                                onClick={onClose}
                            />
                        </div>
                        <div className="flex justify-between">
                            <img src={user?.profile_picture ? user?.profile_picture.file : DefaultImage} 
                                    alt="default image" 
                                    className="w-[70px] rounded-full" />
                            <input type="text"
                                    className="bg-gray-100 dark:bg-[#333333] rounded-2xl px-5 py-2 w-full"
                                    placeholder="What's on your mind"
                                    ref={postRef}/>
                        </div>
                    </div>
            </div>
        )}
    </>

  )
}

export default PostModal
