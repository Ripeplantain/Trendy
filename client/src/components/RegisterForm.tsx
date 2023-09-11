import { UseFormRegister } from "react-hook-form"
import { useState, useCallback, ReactNode } from "react"
import { useDropzone } from "react-dropzone"

import { RegisterData, LoginData } from "../utils/types/FormData"

import { uploadFile } from "../services/uploadFile"


import { useDispatch } from "react-redux"
import { setImageId } from "../state/features/userSlice"


type RegisterFormProps = {
    register: UseFormRegister<RegisterData | LoginData>
}


const RegisterForm: React.FC<RegisterFormProps> = ({ register }) => {

    const [ preview, setPreview ] = useState< ReactNode | null>()
    const dispatch = useDispatch()

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const data = new FormData()
        data.append('file', acceptedFiles[0])
        data.append('purpose', 'PROFILE_PICTURE')

        try {
          const res = await uploadFile(data)
          dispatch(setImageId(res.data.id))
        } catch (error) {
          console.error('Image upload error: ', error)
        }

        setPreview(acceptedFiles[0].name)

    }, [dispatch])
    

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="m-8 md:m-0">
        <div {...getRootProps()} className="mb-7 border border-dashed bg-gray-300 border-gray-900 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer">
          <label htmlFor="profile-picture" className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">
            Profile Picture
          </label>
          <input {...getInputProps()}  className="hidden" id="profile-picture" />
          {isDragActive ? (
            <p className="text-blue-500">Drop the files here ...</p>
          ) : (
            <p className="text-gray-500">
              Drag and drop some files here, or click to select files
            </p>
          )}
        </div>
        {
            preview && (
              <div className="mb-4 text-gray-00">
                <span>{preview}</span>
              </div>
            )
        }
        <div 
            className="grid grid-cols-2 gap-5">
            <input type="hidden" id="profilePicture"
                      {...register("profile_picture")} />

            <div className="col-span-2 md:col-span-1">
                <label htmlFor="firstName" 
                        className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">First Name</label>
                <input type="text"
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id='firstName' {...register("first_name", { required: true })} />
            </div>
            <div className="col-span-2 md:col-span-1">
                <label htmlFor="lastName"
                        className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Last Name</label>
                <input type="text"
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id='lastName' {...register("last_name", { required: true })} />
                        </div>
            <div className="col-span-2">
                <label htmlFor="email" 
                        className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Email</label>
                <input type="email" 
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id='email' {...register("email", { required: true })} />
            </div>
            <div className="col-span-2">
                <label htmlFor="phoneNumber" 
                            className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Phone Number</label>
                <input type="text" 
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id="phoneNumber" {...register("phone_number", { required: true})}/>
            </div>
            <div className="col-span-2">
                <label htmlFor="occupation" 
                            className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Occupation</label>
                <input type="text" 
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id="occupation" {...register("occupation", { required: true})}/>
            </div>
            <div className="col-span-2">
                <label htmlFor="location" 
                            className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Location</label>
                <input type="text" 
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id="location" {...register("location", { required: true})}/>
            </div>
            <div className="col-span-2">
                <label htmlFor="password" 
                            className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Password</label>
                <input type="password" 
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id="password" {...register("password", { required: true})}/>
            </div>
            <div className="col-span-2">
                <label htmlFor="confirmPassword" 
                            className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono"> Confirm Password</label>
                <input type="password" 
                        className="w-full p-3 border-2 border-gray-400 dark:border-gray-600"
                        id="confirmPassword" {...register("confirmPassword", { required: true})}/>
            </div>
        </div>

    </div>
  )
}

export default RegisterForm
