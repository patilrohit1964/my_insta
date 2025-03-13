import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLazyGetUserProfileQuery } from '../redux/api/authApi';
import { setUserProfile } from '../redux/slicers/authSlice';

const useGetUserProfile = () => {
    const [getUserProfile, { data, isError, isSuccess }] = useLazyGetUserProfileQuery();
    console.log(data)
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(setUserProfile(data?.user));
        } catch (error) {
            console.log(error)
            toast.error(error);
        }
    }, [data, isError, isSuccess])
}

export default useGetUserProfile;