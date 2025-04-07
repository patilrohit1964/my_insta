import { Avatar } from '@mui/material';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSendMessageMutation } from '../redux/api/messageApi';
import { setselectedUser } from '../redux/slicers/authSlice';
import { setMessages } from '../redux/slicers/chatSlice';
import Messages from './Messages';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(state => state.auth);
    const { onlineUsers, messages } = useSelector(state => state.chat);
    const isOnline = true;
    const [sendMessage, { data, isError, isSuccess, error }] = useSendMessageMutation();
    const dispatch = useDispatch();
    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await sendMessage({ receiverId, textMessage });
            console.log(res)
            dispatch(setMessages([...messages, data?.newMessage]))
            setTextMessage("");

        } catch (error) {

        }
    }
    useEffect(() => {
        return () => {
            dispatch(setselectedUser(null));
        }
    }, [])
    return (
        <div>
            <div className='flex ml-[16%] h-screen'>
                <section className='w-[30%] md:h-1/4 my-8'>
                    <h1 className='font-bold px-3 mb-4 text-xl'>{user?.username}</h1>
                    <hr className='border border-gray-300' />
                    <div className='overflow-y-auto border-r border-r-gray-500 h-[90vh]'>
                        {suggestedUsers?.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id)
                            return (<div onClick={() => dispatch(setselectedUser(suggestedUser))} className='flex gap-3 items-center mb-5 mt-1 border-b border-b-gray-400 p-2 cursor-pointer' key={suggestedUser?._id}>
                                <Avatar src={suggestedUser?.profilePicture} className='h-14 w-14' />
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{suggestedUser?.username}</span>
                                    <span className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
                                        {
                                            isOnline ? "Online" : "Offline"
                                        }
                                    </span>
                                </div>
                            </div>)
                        })}
                    </div>
                </section>
                {
                    selectedUser ? (
                        <section className='flex-1 border-r border-r-gray-300 flex flex-col h-full'>
                            <div className='flex gap-3 items-center px-3 py-2 border-b border-b-gray-300 sticky top-0 bg-white z-10'>
                                <Avatar src={selectedUser?.profilePicture} />
                                <div>
                                    <span>{selectedUser?.username}</span>
                                </div>
                            </div>
                            <Messages selectedUser={selectedUser} />
                            <div className='flex items-center p-4 border-t border-t-gray-300'>
                                <input type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} className='flex-1 mr-2 outline-none focus-visible:ring-transparent p-3' placeholder='write message...' />
                                <button onClick={() => sendMessageHandler(selectedUser?._id)} className='bg-black py-2 px-4 text-white rounded-md'>send</button>
                            </div>
                        </section>
                    ) :
                        <div className='flex flex-col items-center justify-center mx-auto'>
                            <MessageCircle className='w-32 h-32 my-4' />
                            <h1 className='font-medium'>Your Messages</h1>
                            <span>Send a messages to start a chat.</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default ChatPage