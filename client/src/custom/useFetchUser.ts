import { Dispatch, useEffect } from "react";
import { getUser } from "../services/user"
import { UserState } from "../utils/types/stateTypes";
import { setUser } from "../state/features/userSlice";

interface Payload {
    type: string
    payload: UserState
}


function useFetchUser(user: UserState | null, dispatch: Dispatch<Payload>) {


    useEffect(() => {
        const fetchUser = async ()=> {
            try {
                const response = await getUser()
                dispatch(setUser(response.data))
            } catch (error) {
                console.log(error)
            }
        }

        if (!user){
            fetchUser()
        }
    }, [user, dispatch])
}

export default useFetchUser