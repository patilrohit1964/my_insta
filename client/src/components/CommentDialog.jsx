import { Avatar, Button, Dialog, DialogContent } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCommentPostMutation } from '../redux/api/postApi'

const CommentDialog = ({ openComment, setOpenComment, el, user, postLike, isLiked }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [commentPost, { data, isLoading, isError, isSuccess, error }] = useCommentPostMutation();

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const commentHandler = async (id) => {
        if (!text.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }
        try {
            const res = await commentPost({ id, text }).unwrap();
            setText("");
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error(error?.message || "Something went wrong");
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Comment Added");
            setOpen(false);
        }
        if (isError) {
            toast.error(error?.message || "Failed to add comment");
        }
    }, [isSuccess, isError, data, error]);

    return (
        <div>
            <Dialog
                open={openComment}
                maxWidth={"md"}
                onClose={() => setOpenComment(false)}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        maxWidth: '1200px'
                    }
                }}
            >
                <DialogContent className='p-0 flex'>
                    <div className='flex flex-1'>
                        <div className='w-[600px] h-[600px] bg-black flex items-center'>
                            <img
                                src={el?.image || "https://bit.ly/sage-adebayo"}
                                className='w-full h-auto object-contain'
                                alt="Post"
                            />
                        </div>

                        <div className='w-[400px] flex flex-col h-[600px]'>
                            {/* Header */}
                            <div className='flex items-center justify-between p-4 border-b'>
                                <div className='flex gap-3 items-center'>
                                    <Link className='hover:opacity-80'>
                                        <Avatar
                                            src={user?.profilePicture || 'https://bit.ly/sage-adebayo'}
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    </Link>
                                    <Link className='font-semibold text-sm hover:opacity-80'>
                                        {user?.username || "Anonymous"}
                                    </Link>
                                </div>
                                <MoreHorizontal
                                    className='cursor-pointer hover:opacity-70'
                                    onClick={handleOpen}
                                    size={20}
                                />
                            </div>

                            {/* Comments Section */}
                            <div className='flex-1 overflow-y-auto p-4'>
                                {/* Original Post */}
                                <div className='flex gap-3 mb-6'>
                                    <Avatar
                                        src='https://bit.ly/sage-adebayo'
                                        sx={{ width: 32, height: 32 }}
                                    />
                                    <div>
                                        <div className='text-sm'>
                                            <span className='font-semibold mr-2'>username</span>
                                            This is the caption of the post. It can be multiple lines long and will wrap accordingly.
                                        </div>
                                        <div className='text-xs text-gray-500 mt-1'>2d</div>
                                    </div>
                                </div>

                                {/* Comments will be mapped here */}
                                <div className='space-y-4'>
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className='flex gap-3'>
                                            <Avatar
                                                src='https://bit.ly/sage-adebayo'
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <div>
                                                <div className='text-sm'>
                                                    <span className='font-semibold mr-2'>commenter</span>
                                                    This is a comment on the post
                                                </div>
                                                <div className='flex items-center gap-3 mt-1'>
                                                    <span className='text-xs text-gray-500'>2d</span>
                                                    <span className='text-xs text-gray-500 font-semibold cursor-pointer'>Reply</span>
                                                </div>
                                            </div>
                                            <FaRegHeart className='ml-auto cursor-pointer hover:opacity-70' size={12} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions Bar */}
                            <div className='p-4 border-t'>
                                <div className='flex items-center gap-3 mb-3'>
                                    {
                                        isLiked ?
                                            <FaHeart className={`cursor-pointer text-2xl hover:text-pink-300 ${isLiked && 'text-pink-400'}`} />
                                            :
                                            <FaRegHeart className={`cursor-pointer text-2xl hover:text-gray-600 ${isLiked && 'text-pink-400'}`} />
                                    }
                                    <span className='text-sm font-semibold'>{postLike || null}</span>
                                </div>

                                {/* Comment Input */}
                                <div className='flex items-center gap-2'>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder='Add a comment...'
                                        className='w-full outline-none text-sm'
                                    />
                                    {text && (
                                        <Button
                                            variant="text"
                                            className='text-blue-500 hover:text-blue-600 min-w-fit p-0'
                                            onClick={() => el?._id && commentHandler(el._id)}
                                        >
                                            Post
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Actions Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        maxWidth: '400px'
                    }
                }}
            >
                <DialogContent className='p-0'>
                    <div className='flex flex-col text-sm'>
                        <button className='p-3 hover:bg-gray-50 text-red-500 font-semibold'>
                            Unfollow
                        </button>
                        <button className='p-3 hover:bg-gray-50 border-t'>
                            Add to favorites
                        </button>
                        <button className='p-3 hover:bg-gray-50 border-t' onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CommentDialog