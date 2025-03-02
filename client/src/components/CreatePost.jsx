import { Avatar, Button, Dialog, DialogContent, DialogTitle, TextareaAutosize } from '@mui/material'
import React, { useRef, useState } from 'react'

const CreatePost = ({ open, setOpen }) => {

    const imageRef = useRef(null)
    const [file, setFile] = useState();
    const [caption, setCaption] = useState();
    const [imagePreview, setImagePreview] = useState(null);
    const createPostHandler = (e) => {
        try {

        } catch (error) {

        }
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file);
            const image = URL.createObjectURL(file)
            console.log()
            setImagePreview(image)
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogContent>
                    <DialogTitle className='text-center font-semibold'>Create New Post</DialogTitle>
                    <div onClick={createPostHandler} className='flex gap-3 items-center'>
                        <Avatar src='' />
                        <div>
                            <h1 className='font-semibold text-xs'>Username</h1>
                            <span className='text-gray-600 text-xs'>Bio here...</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-full mt-6'>
                        <textarea rows={5} className='focus-visible:ring-transparent outline-none border border-blue-400 p-3 rounded w-full' placeholder='Write a caption...' />
                        <div className='border border-red-500'>
                            {imagePreview && <img src={imagePreview} alt='Preview' />}
                        </div>
                        <input ref={imageRef} type="file" className='hidden' onChange={fileChangeHandler} />
                        <button onClick={() => imageRef.current.click()} variant='outline' className='w-fit mx-auto bg-[#0095f6] hover:bg-[#258bcf] p-3 rounded-md text-white mt-3'>Select from computer</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePost