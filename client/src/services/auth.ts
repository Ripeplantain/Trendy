import apiCall from "./api"
import { RegisterData, LoginData } from "../utils/types/FormData"


export const registerUser = async (data: RegisterData) => {
    console.log(data)
    // return await apiCall.post('user/auth/register/', data);
}


export const loginUser = async (data: LoginData) => {
    return await apiCall.post('user/auth/login/', data);
}