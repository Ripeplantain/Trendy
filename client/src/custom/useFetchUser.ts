import { useEffect } from "react";
import { fetchUser, selectUser } from "../state/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";



function useFetchUser() {
    const dispatch: AppDispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(() => {
        dispatch(fetchUser())
    },[dispatch])

return { user }
}

export default useFetchUser