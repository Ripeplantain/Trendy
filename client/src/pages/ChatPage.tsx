import { Navbar } from '../components';
import { useRef } from 'react';
import useChatUser from '../custom/useChatUser';
import { DefaultImage } from '../utils/constants';
import { useSelector } from 'react-redux';
import { selectMessages, selectRoom, selectRoomId } from '../state/features/chatSlice';
import useFetchUser from '../custom/useFetchUser';
import useChatRoom from '../custom/useChatRoom';
import useWebsocket from '../custom/useWebsocket';
import useSendMessage from '../custom/useSendMessage';

const ChatPage: React.FC = () => {
  const { receiver } = useChatUser();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const messages = useSelector(selectMessages);
  const { user } = useFetchUser();
  useChatRoom(receiver?.id , user?.id );
  const room = useSelector(selectRoom);
  const room_id = useSelector(selectRoomId);
  const { sendMessage } = useWebsocket(room);
  const { sendMessageToServer } = useSendMessage();


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageRef.current?.value;
    const name: string = user?.email || ''
    sendMessage(message || '', name);
    sendMessageToServer(room_id, message || '', user?.id)
    messageRef.current!.value = '';
  }


  return (
    <div>
        <Navbar />
        <div 
            className='dark:bg-gray-950 dark:text-white h-screen flex flex-col'
        >
            <div className='flex justify-center mt-[6rem] items-center gap-4 border-b border-gray-600 pb-5'>
                <img
                    className='w-10 h-10 rounded-full'
                    src={receiver?.profile_picture ? receiver?.profile_picture.file : DefaultImage} 
                    alt="default image" />
                <h2
                    className='text-xl font-bold tracking-wide'
                >{receiver?.first_name} {receiver?.last_name}</h2>
            </div>
            <div
                className='h-[70vh] overflow-y-scroll flex flex-col-reverse'
            >
            {messages.slice().reverse().map((message, index) => (
                    <div
                        key={index}
                        className={`${message.user === user?.email ? 'self-end bg-blue-500' : 'self-start bg-gray-200 dark:bg-gray-700'}
                                    flex flex-col rounded-xl w-fit m-5 p-4`}
                    >   
                        <div>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-wrap w-screen items-center justify-center gap-2'>
                    <textarea 
                        ref={messageRef}
                        className='w-full dark:bg-gray-900 text-black dark:text-white border border-gray-600 rounded-lg p-2'
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
