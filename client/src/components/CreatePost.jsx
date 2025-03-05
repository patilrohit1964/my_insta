import { Avatar, Button, Dialog, DialogContent, DialogTitle, TextareaAutosize } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { useAddPostMutation } from '../redux/api/postApi';
import axios from "axios"
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/slicers/postSlice';
const CreatePost = ({ open, setOpen }) => {
    const [addPost, { data, isError, isLoading, isSuccess }] = useAddPostMutation();
    const { user } = useSelector(state => state.auth);
    const { posts } = useSelector(state => state.post);
    const imageRef = useRef(null);
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const createPostHandler = async (e) => {
        if (!file || !caption?.trim()) {
            toast.error("Please select an image and enter a caption");
            return;
        }
        const formData = new FormData();
        formData.append("caption", caption);
        if (file) formData.append("image", file);
        try {
            const result = await addPost(formData).unwrap();
            dispatch(setPosts([result?.post, ...posts]))
            toast.success("Post created successfully");
        } catch (error) {
            console.error("RTK Query error:", error);
            toast.error("Failed to create post");
        }
    };


    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file);
            const image = URL.createObjectURL(file)
            setImagePreview(image)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Post created successfully")
            setOpen(false)
            setFile(null)
            setImagePreview(null)
            setCaption("")
        }
        if (isError) {
            toast.error("Failed to create post")
        }
    }, [isError, isSuccess]);
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogContent>
                    <DialogTitle className='text-center font-semibold'>Create New Post</DialogTitle>
                    <div className='flex gap-3 items-center'>
                        <Avatar src={user?.profilePicture} />
                        <div>
                            <h1 className='font-semibold text-xs'>{user?.username}</h1>
                            <span className='text-gray-600 text-xs'>{user?.bio}</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-6'>
                        <textarea rows={5} className='focus-visible:ring-transparent outline-none border border-blue-400 p-3 rounded w-full' placeholder='Write a caption...' onChange={(e) => setCaption(e.target.value)} />
                        {
                            imagePreview &&
                            <div className='border border-red-500 h-56 w-full'>
                                <img src={imagePreview} alt='Preview' className='w-full h-full object-cover' />
                            </div>
                        }
                        <input ref={imageRef} type="file" className='hidden' onChange={fileChangeHandler} />
                        <button onClick={() => imageRef.current.click()} variant='outline' className='w-fit mx-auto bg-[#0095f6] hover:bg-[#258bcf] p-3 rounded-md text-white mt-3'>Select from computer</button>
                        {
                            imagePreview && (
                                <button disabled={isLoading} variant='outline' className='w-full mx-auto p-3 rounded-md text-white mt-3 bg-[#222d42] hover:bg-[#364052]' onClick={createPostHandler}>{isLoading ? <Loader2 className="animate-spin inline" /> : "Post"}</button>
                            )
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePost