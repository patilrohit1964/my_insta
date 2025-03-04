import React, { useEffect } from 'react'
import { useAllPostsQuery } from '../redux/api/postApi'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setPosts } from '../redux/slicers/postSlice';

const useGetAllPosts = () => {
    const { data, isLoading, isError, isSuccess } = useAllPostsQuery();
    const dispatch = useDispatch();
    useEffect(() => {
        try {
            dispatch(setPosts(data?.posts));
        } catch (error) {
            console.log(error)
            toast.error(error);
        }
    }, [data, isError, isSuccess])
}

export default useGetAllPosts