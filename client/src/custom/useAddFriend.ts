import {  useCallback } from 'react';
import { addFriend } from '../services/user';
import { setNotifications } from '../state/features/userSlice';
import { useDispatch } from 'react-redux';
import { ServerError } from '../utils/types/errorType';


const useAddFriend = () => {
    const dispatch = useDispatch()

    const setAddFriend = useCallback(async (email: string) => {
        try {
            const response = await addFriend(email)
            dispatch(setNotifications(['Friend added successfully']))
            return response
        } catch(error) {
            const err = error as ServerError
            dispatch(setNotifications([err.response.data.detail]))
        }
    }, [dispatch])
    return { setAddFriend }
}


export default useAddFriend;
