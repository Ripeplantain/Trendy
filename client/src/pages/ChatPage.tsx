import { Navbar } from '../components'
import {  w3cwebsocket as W3CWebSocket } from 'websocket'
import {  useEffect, useMemo, useRef } from 'react'
import useChatUser from '../custom/useChatUser'
import { DefaultImage } from '../utils/constants'
import { DJANGO_BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages, selectMessages } from '../state/features/chatSlice'
import useFetchUser from '../custom/useFetchUser'


interface SocketData {  
    type?: string
    message: string
}

const ChatPage: React.FC = () => {

    const { receiver } = useChatUser()
    const baseUrl = DJANGO_BASE_URL
    const messageRef = useRef<HTMLTextAreaElement>(null)
    const dispatch = useDispatch()
    const messages = useSelector(selectMessages)
    const { user } = useFetchUser()


    const client = useMemo(() => new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/lobby/'), []);

    useEffect(()=>{


        client.onopen = () => {
            console.log('WebSocket Client Connected')
        }

        client.onmessage = (e) => {
            let data: SocketData = { message: '' }

            if (typeof e.data === 'string'){
                data = JSON.parse(e.data)
            }

            if(data.type === 'message'){
                dispatch(addMessages({
                    content: data.message,
                    sender: user,
                }))
            }
        }

    },[client, dispatch, user])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = messageRef.current?.value
        client.send(JSON.stringify({
            'message':message
        }))
        messageRef.current!.value = ''
    }


  return (
    <div>
        <Navbar />
        <div 
            className='dark:bg-gray-950 dark:text-white h-screen flex flex-col'
        >
            <div className='flex w-screen justify-center mt-[6rem] items-center gap-4 border-b border-gray-600 pb-5'>
                <img
                    className='w-10 h-10 rounded-full'
                    src={receiver?.profile_picture ? baseUrl + receiver?.profile_picture : DefaultImage} 
                    alt="default image" />
                <h2
                    className='text-xl font-bold tracking-wide'
                >{receiver?.first_name} {receiver?.last_name}</h2>
            </div>
            <div>
            {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex flex-col rounded-xld ${message.sender === user ? 'items-end' : 'items-start'} w-fit m-5 p-4 bg-slate-200 dark:bg-slate-600`}
                    >
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className='fixed bottom-0'>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-wrap w-screen items-center justify-center gap-2'>
                    <textarea 
                        cols={150}
                        ref={messageRef}
                        className='dark:bg-gray-900 text-black dark:text-white border border-gray-600 rounded-lg p-2'
                        placeholder='Type your message here...'
                    />
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg px-6 w-full'
                    >Send</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ChatPage
