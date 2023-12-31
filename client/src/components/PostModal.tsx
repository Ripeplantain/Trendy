import { MouseEvent, useRef, useCallback, useState, ReactNode } from "react"
import { CloseIcon, DefaultImage} from "../utils/constants"

import { useSelector, useDispatch } from "react-redux"
import { selectUser, selectImageId, setNotifications, setImageId } from "../state/features/userSlice"
import { FileRejection, useDropzone } from "react-dropzone"
import { TailSpin } from 'react-loader-spinner'
import { uploadFile } from "../services/uploadFile"
import useSendPost from '../custom/useSendPost'
import React from "react"


interface ModalProp {
    visible: boolean
    onClose: () => void
}


const PostModal: React.FC<ModalProp> = ({visible, onClose}) => {

            const postRef = useRef<HTMLInputElement>(null)
            const user = useSelector(selectUser)
            const dispatch = useDispatch()
            const [ preview, setPreview ] = useState< ReactNode | null>()
            const imageId = useSelector(selectImageId)
            const {status , setPost, setStatus} = useSendPost()
            const [errorMessage, setErrorMessage] = useState<string | null>(null)
            const [isLoading, setIsLoading] = useState<boolean>(false)


            const onDrop = useCallback(async (acceptedFiles: File[], fileRejections:FileRejection[]) => {

                if (fileRejections.length > 0) {
                    setErrorMessage(fileRejections[0].errors[0].message)
                    return
                }

                const data = new FormData()
                data.append('file', acceptedFiles[0])
                data.append('upload_preset', 'bp4hjemb')

                try {
                    setIsLoading(true)
                    const res = await uploadFile(data)
                    dispatch(setImageId(res.secure_url))
                    dispatch(setNotifications(['Image uploaded successfully']))
                } catch (error) {
                    dispatch(setNotifications(['Image upload error']))
                    console.error('Image upload error: ', error)
                } finally {
                    setIsLoading(false)
                }

                setPreview(acceptedFiles[0].name)

            }, [dispatch])

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
                dispatch(setImageId(''))
                onClose()
            }

            const {getRootProps, getInputProps, isDragActive} = useDropzone({
                onDrop,
                maxFiles: 1,
                multiple: false,
                accept: {
                    image: ['image/jpeg', 'image/png', 'image/jpg'],
                },
                maxSize: 50 * 1024 * 1024,
            })

            const handleOnClose = (e: MouseEvent) => {
                if (e.target instanceof HTMLDivElement && e.target.id === "container") {
                onClose();
                }
            };

            return (
            <>
                {visible && (
                <div id="container" onClick={handleOnClose} className="z-10 fixed inset-0 bg-black 
                            bg-opacity-30 backdrop-blur-sm
                            flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-900 p-10 rounded">
                        <div className="flex justify-between items-center text-3xl py-6 border-b border-gray-50">
                            <h3>Create Post</h3>
                            <CloseIcon onClick={onClose} />
                        </div>
                        <div className="flex justify-between mt-7 gap-3">
                            <img src={user?.profile_picture ? user?.profile_picture : DefaultImage}
                                alt="default image" className="w-[70px] rounded-full" />
                            <input type="text" className="bg-gray-100 dark:bg-[#333333] rounded-2xl p-5 w-full"
                                placeholder="What's on your mind" ref={postRef} />
                        </div>
                        <div {...getRootProps()}
                            onClick={e => e.stopPropagation()}
                            className="my-7 border border-dashed bg-gray-300 bg-opacity-20 border-gray-900 dark:border-gray-600 rounded-lg py-11 px-6 text-center cursor-pointer">
                            <label htmlFor="post-image"
                                className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono mb-3">
                                Upload Image
                            </label>
                            <input {...getInputProps()} className="hidden" id="post-image" />
                            {isDragActive ? (
                            <p className="text-blue-500">Drop the files here ...</p>
                            ) : (
                            <p className="text-gray-500">
                                Drag and drop some files here, or click to select files
                            </p>
                            )}
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
                            )}
                        </div>
                        
                        {isLoading && <TailSpin
                                        height="80"
                                        width="80"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    /> }

                        {
                        preview && (
                        <>
                            <div className="mb-4 text-gray-00">
                                <span>{preview}</span>
                            </div>
                            <div>
                                <button
                                    onClick={handlePostSubmit}
                                    className="bg-blue-600 w-full py-6 text-white text-xl font-medium tracking-wider hover:bg-blue-500">Add
                                    to your post</button>
                            </div>
                        </>
                        )
                        }

                    </div>
                </div>
                )}
            </>

            )
            }

            export const MemoizedPostModal = React.memo(PostModal)