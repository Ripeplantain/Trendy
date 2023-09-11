import { Dispatch, useEffect } from "react";
import { getFriends } from '../services/user'
import { UserState } from "../utils/types/stateTypes";
import { setNewFriends } from "../state/features/userSlice";

interface Payload {
    type: string
    payload: UserState[]
}

function useFetchUsers(dispatch: Dispatch<Payload>) {
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await getFriends()
                console.log(response.data)
                dispatch(setNewFriends(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchFriends()
    }, [dispatch])

}

export default useFetchUsers