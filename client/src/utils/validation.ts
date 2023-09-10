import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})


export const registerSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone_number: yup.string().required(),
    location: yup.string().required(),
    occupation: yup.string().required(),
})