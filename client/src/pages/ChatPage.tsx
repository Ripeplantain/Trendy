import { Navbar } from '../components'
import {  w3cwebsocket as W3CWebSocket } from 'websocket'
import {  useEffect } from 'react'
import useChatUser from '../custom/useChatUser'
import { DefaultImage } from '../utils/constants'
import { DJANGO_BASE_URL } from '../utils/constants'


interface SocketData {
    message: string
}

const ChatPage: React.FC = () => {

    const { receiver, owner } = useChatUser()
    const baseUrl = DJANGO_BASE_URL
    console.log(receiver)
    console.log(owner)

    useEffect(()=>{

        const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/lobby/')

        client.onopen = () => {
            console.log('WebSocket Client Connected')
        }

        client.onmessage = (e) => {
            let data: SocketData = { message: '' }

            if (typeof e.data === 'string'){
                data = JSON.parse(e.data)
            }

            console.log(data)
        }
    },[])


  return (
    <div>
        <Navbar />
        <div 
            className='dark:bg-gray-950 dark:text-white h-screen flex flex-col'
        >
            <div className='flex w-screen justify-center mt-[7rem] items-center gap-4 border-b pb-9'>
                <img
                    className='w-20 h-20 rounded-full'
                    src={receiver?.profile_picture ? baseUrl + receiver?.profile_picture : DefaultImage} 
                    alt="default image" />
                <h2
                    className='text-2xl font-bold tracking-wide'
                >{receiver?.first_name} {receiver?.last_name}</h2>
            </div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default ChatPage
