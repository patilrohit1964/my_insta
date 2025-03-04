import React, { useEffect } from 'react'
import { useAllPostsQuery } from '../redux/api/postApi'
import { toast } from 'react-toastify';

const useGetAllPosts = () => {
    const { data, isLoading, isError, isSuccess } = useAllPostsQuery();
    useEffect(() => {
        try {
            console.log(data);
        } catch (error) {
            console.log("error");
            toast.error(error);
        }
    }, [data, isError, isSuccess])
}

export default useGetAllPosts