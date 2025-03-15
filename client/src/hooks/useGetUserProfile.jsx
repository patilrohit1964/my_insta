import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserProfileByIdQuery } from '../redux/api/authApi';
import { setUserProfile } from '../redux/slicers/authSlice';

const useGetUserProfile = (userId) => {
    const { data, isError, isSuccess, error } = useGetUserProfileByIdQuery(userId, {
        skip: !userId
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserProfile(data?.user));
        }
    }, [data, dispatch, isSuccess]);
    return { data, isError, isSuccess, error };
}

export default useGetUserProfile;