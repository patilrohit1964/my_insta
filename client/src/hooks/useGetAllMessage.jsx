import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetMessagesQuery } from '../redux/api/messageApi';
import { setMessages } from '../redux/slicers/chatSlice';

const useGetAllMessage = () => {
    const { selectedUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { data, isSuccess, isError, error } = useGetMessagesQuery(selectedUser?._id, {
        skip: !selectedUser?._id, // Prevents firing if no user is selected
    });
    console.log(data, "data message api");
    useEffect(() => {
        if (isSuccess && data?.message) {
            dispatch(setMessages(data.message));
        }
        if (isError) {
            console.error(error);
            toast.error('Failed to load messages');
        }
    }, [data, isSuccess, isError, error, dispatch, selectedUser]);
};

export default useGetAllMessage;
