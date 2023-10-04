import { useCallback, useMemo, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDispatch } from "react-redux";
import { addMessages } from '../state/features/chatSlice';


interface SocketData {
    type?: string;
    message: string;
    name: string;
  }
const useWebsocket = (room:string) => {

    const client = useMemo(() => new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${room}/`), [room]);
    const dispatch = useDispatch();

    useEffect(()=> {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    
        client.onmessage = (e) => {
            let data: SocketData = {message: '', name: ''};
    
            if (typeof e.data === 'string') {
                data = JSON.parse(e.data);
                dispatch(
                    addMessages({
                        message: data.message,
                        sender: data.name,
                    }),
                )
            }
        };
    },[client, dispatch])


    const sendMessage = useCallback((message:string, name: string) => {
        client.send(JSON.stringify({
            message,
            name,
        }));
    }, [client]);

    return {sendMessage};
}

export default useWebsocket;
