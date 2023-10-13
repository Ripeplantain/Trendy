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

    const dispatch = useDispatch();
    const client = useMemo(() => new W3CWebSocket(`ws://localhost:8000/ws/chat/${room}/`), [room]);

    const sendMessage = useCallback((message: string, name: string) => {
        if (client.readyState === client.OPEN) {
            const msg = { message, name };
            client.send(JSON.stringify(msg));
        }
    }, [client]);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataFromServer: SocketData = JSON.parse(message.data.toString());
            console.log('got reply! ', dataFromServer);
            dispatch(addMessages({
                message: dataFromServer.message,
                sender: dataFromServer.name,
            }));
        };
        client.onclose = () => {
            console.log('echo-protocol Client Closed');
        };
        client.onerror = (error) => {
            console.log('Connection Error: ', error);
        };
    }, [client, dispatch]);

    return { sendMessage };
}

export default useWebsocket;
