import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useSuggestedUserQuery } from '../redux/api/authApi';
import { setSuggestedUsers } from '../redux/slicers/authSlice';

const usetGetSuggestedUsers = () => {
    const { data, isLoading, isError, isSuccess } = useSuggestedUserQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(setSuggestedUsers(data?.users));
        } catch (error) {
            console.log(error)
            toast.error(error);
        }
    }, [data, isError, isSuccess])
}

export default usetGetSuggestedUsers;