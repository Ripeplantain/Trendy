import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotifications, selectNotification, markRead } from '../state/features/notificationSlice';
import { getNotifications, markAsRead } from '../services/notification';
import { useNavigate } from 'react-router-dom';


const useNotification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotification);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await getNotifications();
            dispatch(addNotifications(response.data));
        }
        fetchNotifications();
    }, [dispatch]);

    const markNotificationAsRead = useCallback(async (id: number) => {
        const res = await markAsRead(id);
        dispatch(markRead(id));
        navigate(`/post/${res.data.post}`);
    }, [dispatch, navigate]);


    return { notifications, markNotificationAsRead };
}

export default useNotification;
