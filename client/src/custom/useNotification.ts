import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotifications, selectNotification } from '../state/features/notificationSlice';
import { getNotifications } from '../services/notification';




const useNotification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotification);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getNotifications();
            dispatch(addNotifications(response.data));
        }
        fetchNotifications();
    }, [dispatch]);

    return { notifications };
}

export default useNotification;
