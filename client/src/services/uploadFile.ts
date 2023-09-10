import apiCall  from './api';



export const uploadFile = async (data: FormData) => {
    return await apiCall.post('file/upload/', data);
}