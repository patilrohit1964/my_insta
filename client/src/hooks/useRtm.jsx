import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/slicers/chatSlice';

const useRtm = () => {
    const dispatch = useDispatch();
    const { socket } = useSelector(state => state?.socket)
    const { messages } = useSelector(state => state?.chat)
    useEffect(() => {
        socket?.on("newMessage", (newMsg) => {
            dispatch(setMessages([...messages, newMsg]))
        })
        return () => {
            socket?.off("newMessage");
        }
    }, [messages, setMessages]);
};

export default useRtm;
