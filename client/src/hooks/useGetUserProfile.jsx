import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetUserProfileByIdQuery } from '../redux/api/authApi';
import { setUserProfile } from '../redux/slicers/authSlice';

const useGetUserProfile = (userId) => {
    const { data, isError, isSuccess, error } = useGetUserProfileByIdQuery();
    console.log(data)
    const dispatch = useDispatch();
    return { data, isError, isSuccess, error }
}

export default useGetUserProfile;