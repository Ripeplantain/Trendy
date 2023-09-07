import { UseFormRegister } from "react-hook-form"
import { LoginData } from "../utils/types/FormData"


type LoginFormProps = {
    register: UseFormRegister<LoginData>
}


const LoginForm: React.FC<LoginFormProps> = ({ register }) => {
  return (
    <div className="m-8">
        <div 
            className="grid md:grid-cols-2 gap-10">
            <div className="">
                <label htmlFor="email" 
                        className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Email</label>
                <input type="email" 
                        className="p-3 border-2 border-gray-400 dark:border-gray-600"
                        id='email' {...register("email", { required: true })} />
            </div>
            <div>
                <label htmlFor="password" 
                            className="block text-2xl text-gray-700 dark:text-white tracking-wider font-mono">Password</label>
                <input type="password" 
                        className="p-3 border-2 border-gray-400 dark:border-gray-600"
                        id="password" {...register("password", { required: true})}/>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
