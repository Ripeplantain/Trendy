import axios from 'axios';


interface Token {
    access: string | null,
    refresh: string | null,
}


const baseURL = 'http://localhost:8000/api/v1/'
const tokenJson = localStorage.getItem('auth')

let token: Token = tokenJson && JSON.parse(tokenJson)


const apiCall = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default apiCall;


const privateCall = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

privateCall.interceptors.request.use(async req => {
    token = JSON.parse(localStorage.getItem('auth') || 'null')
    req.headers.Authorization = `Bearer ${token.access}`
    return req
})



privateCall.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true

            const newAccessToken = await refreshAccessToken(token.refresh)
            if (newAccessToken){
                token = newAccessToken
                localStorage.setItem('auth', JSON.stringify(token))
                return privateCall(originalRequest)
            }
        }

        return Promise.reject(error)
    }
)

const refreshAccessToken = async (refresh: string | null) => {
    try {
        const response = await apiCall.post('user/token/refresh/', {refresh: refresh})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export { privateCall }