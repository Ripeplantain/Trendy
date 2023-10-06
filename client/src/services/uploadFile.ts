// import apiCall  from './api';


const cloud_name = 'dnv6frl63';



export const uploadFile = async (data: FormData) => {

    const options = {
        method: 'POST',
        body: data,
    };

    // return await apiCall.post('file/upload/', data);
    return fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res;
        })
        .catch(err => {
            console.log(err);
        })
}