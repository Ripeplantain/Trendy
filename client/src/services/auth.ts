import apiCall from "./api"
import { RegisterData, LoginData } from "../utils/types/FormData"


export const registerUser = async (data: RegisterData) => {
    return await apiCall.post('user/auth/register/', data);
}


export const loginUser = async (data: LoginData) => {
    return await apiCall.post('user/token/', data);
}

export const logoutUser = async (data: FormData) => {
    return await apiCall.post('user/auth/logout/', data);
}