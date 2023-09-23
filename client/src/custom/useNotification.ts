import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotifications, selectNotification, markRead } from '../state/features/notificationSlice';
import { getNotifications, markAsRead } from '../services/notification';




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

    const markNotificationAsRead = useCallback(async (id: number) => {
        await markAsRead(id);
        dispatch(markRead(id));
    }, [dispatch]);


    return { notifications, markNotificationAsRead };
}

export default useNotification;
