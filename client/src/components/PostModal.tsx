import { MouseEvent, useRef } from "react"
import { CloseIcon, DefaultImage, DJANGO_BASE_URL } from "../utils/constants"

import { useSelector, useDispatch } from "react-redux"
import { selectUser, selectImageId, setNotifications, setImageId } from "../state/features/userSlice"
import useSendPost from '../custom/useSendPost'
import React from "react"
import { UploadWidget } from "."

interface ModalProp {
visible: boolean
onClose: () => void
}


const PostModal: React.FC<ModalProp> = ({visible, onClose}) => {

            const postRef = useRef<HTMLInputElement>(null)
            const user = useSelector(selectUser)
            const dispatch = useDispatch()
            const imageId = useSelector(selectImageId)
            const {status , setPost, setStatus} = useSendPost()
            const baseUrl = DJANGO_BASE_URL

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
                postForm.append('content', postRef.current?.value as string)
                postForm.append('file', imageId.toString())
                await setPost(postForm)
                dispatch(setImageId(0))
                onClose()
            }


            const handleOnClose = (e: MouseEvent) => {
                if (e.target instanceof HTMLDivElement && e.target.id === "container") {
                onClose();
                }
            };

            return (
            <>
                {visible && (
                <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black 
                            bg-opacity-30 backdrop-blur-sm
                            flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-900 p-10 rounded">
                        <div className="flex justify-between items-center text-3xl py-6 border-b border-gray-50">
                            <h3>Create Post</h3>
                            <CloseIcon onClick={onClose} />
                        </div>
                        <div className="flex justify-between mt-7 gap-3">
                            <img src={user?.profile_picture ? baseUrl + user?.profile_picture.file : DefaultImage}
                                alt="default image" className="w-[70px] rounded-full" />
                            <input type="text" className="bg-gray-100 dark:bg-[#333333] rounded-2xl p-5 w-full"
                                placeholder="What's on your mind" ref={postRef} />
                        </div>
                        <div>
                            <UploadWidget />
                        </div>
                        <button
                            onClick={handlePostSubmit}
                            className="bg-blue-600 w-full py-6 text-white text-xl font-medium tracking-wider hover:bg-blue-500">Add
                                    to your post</button>
                    </div>
                </div>
                )}
            </>

            )
            }

            export const MemoizedPostModal = React.memo(PostModal)