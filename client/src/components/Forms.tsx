import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectImageId, setImageId, setLogin,  } from "../state/features/userSlice";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import { LoginData, RegisterData } from "../utils/types/FormData";
import { Logo } from "../utils/constants"
import { LoginForm, RegisterForm } from ".";
import { registerUser, loginUser } from "../services/auth";
import { registerSchema, loginSchema } from "../utils/validation";


const Forms = () => {

    const [ showLogin, setShowLogin ] = useState(true)
    const imageId = useSelector(selectImageId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let schema;

    if (!showLogin) {
        schema = registerSchema
    } else {
        schema = loginSchema
    }

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<LoginData | RegisterData>({resolver: yupResolver(schema)});

    const onSubmit = async(data: LoginData | RegisterData) => {
        try {
            if (showLogin) {
                const res = await loginUser(data as LoginData)
                console.log(res.data)
                dispatch(setLogin(res.data))
                navigate('/home')
            } else {
                registerUser(data as RegisterData)
                dispatch(setImageId(0))
                setShowLogin(!showLogin)
                console.log(showLogin)
            }
        } catch(error){
            console.error(error)
        }
    }


  return (
        <div className={`dark:bg-gray-950 flex flex-col w-screen min-h-screen items-center gap-8 ${showLogin ? 'pt-[5rem] md:pt-[12rem]' : 'py-[3rem]'}`}>
            <div className='absolute top-1 left-0'>
                {Object.entries(errors).map(([key, value]) => {
                    return (
                        <div key={key} className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 my-2
                        " role="alert">
                          <p className='text-lg tracking-wider'>{value?.message}</p>
                        </div>
                    )
                }, [])}
            </div>

        <div>
            <img src={Logo} alt="logo icon" width={150} />
        </div>
        <div>
            {showLogin ? (
                    <h2 className="text-center text-[20px] md:text-2xl text-gray-700 dark:text-white tracking-widest uppercase">
                    Start sharing mermories</h2>
            ) : (
                <h2 className="text-center text-2xl text-gray-700 dark:text-white tracking-widest uppercase">
                    Create an account
                </h2>
            )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

            {showLogin ? (
                <LoginForm register={register}/>
            ) : 
                <RegisterForm register={register}/>
                }

            <div className="flex justify-center items-center gap-4">
                <button type="submit"
                        onClick={() => {
                               setValue('profile_picture', imageId, {
                               shouldValidate: true,
                               shouldDirty: true
                        })
                        }}
                        className="bg-orange-600 dark:bg-[#1F1F1F] font-medium
                                    rounded-lg mt-6 px-6 py-3 text-lg tracking-widest uppercase
                                    text-white dark:text-[#FFFFFF]
                                    hover:bg-black hover:text-white delay-100
                                    dark:hover:bg-[#F2F2F2] dark:hover:text-black">
                    {showLogin ? 'Login' : 'Register'}
                </button>
            </div>
            <div
                onClick={() => setShowLogin(!showLogin)}
                className="dark:text-white mt-5 text-lg tracking-wider flex justify-center items-center gap-4 cursor-pointer font-mono">
                {showLogin ? (
                    <p>
                        Dont have an <span className="text-blue-600">account?</span>
                    </p>
                ) : (
                    <p>
                        Already have an <span className="text-blue-600">account?</span>
                    </p>
                )}
            </div>
        </form>
    </div>
  )
}

export default Forms
