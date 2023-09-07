import { useForm } from "react-hook-form";
import { useState } from "react";

import { LoginData, RegisterData } from "../utils/types/FormData";

import { Logo } from "../utils/constants"
import { LoginForm, RegisterForm } from ".";


const Forms = () => {

    const [ showLogin, setShowLogin ] = useState(true)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData | RegisterData>();
    const onSubmit = handleSubmit((data) => console.log(data));

  return (
        <div className={`dark:bg-gray-950 flex flex-col w-screen h-screen items-center gap-8 ${showLogin ? 'pt-[12rem]' : 'py-[3rem]'}`}>
            <div className='absolute top-1 left-0'>
                {Object.entries(errors).map(([key, value]) => {
                    return (
                        <div key={key} className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 my-2
                        " role="alert">
                          <p className='text-xs'>{value?.message}</p>
                        </div>
                    )
                }, [])}
            </div>

        <div>
            <img src={Logo} alt="logo icon" width={150} />
        </div>
        <div>
            {showLogin ? (
                    <h2 className="text-center text-2xl text-gray-700 dark:text-white tracking-widest uppercase">
                    Start sharing mermories</h2>
            ) : (
                <h2 className="text-center text-2xl text-gray-700 dark:text-white tracking-widest uppercase">
                    Create an account
                </h2>
            )}
        </div>
        <form onSubmit={onSubmit}>

            {showLogin ? (
                <LoginForm register={register}/>
            ) : 
                <RegisterForm register={register}/>}

            <div className="flex justify-center items-center gap-4">
                <button type="submit"
                        className="bg-orange-600 dark:bg-[#1F1F1F] font-medium
                                    rounded-lg mt-6 px-6 py-3 text-lg tracking-widest uppercase
                                    text-white dark:text-[#FFFFFF]
                                    hover:bg-black hover:text-white
                                    dark:hover:bg-[#F2F2F2] dark:hover:text-black">
                    {showLogin ? 'Login' : 'Register'}
                </button>
            </div>
            <div
                onClick={() => setShowLogin(!showLogin)}
                className="dark:text-white mt-5 text-lg tracking-wider flex justify-center items-center gap-4 cursor-pointer">
                {showLogin ? (
                    <p>
                        Already have an <span className="text-blue-600">account?</span>
                    </p>
                ) : (
                    <p>
                        Log into your <span className="text-blue-600">account</span>
                    </p>
                )}
            </div>
        </form>
    </div>
  )
}

export default Forms
