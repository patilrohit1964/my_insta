import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MoreHorizontal, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LayoutHelmet from "./LayoutHelmet"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CommentDialog from './CommentDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useDeletePostMutation } from '../redux/api/postApi';
import { toast } from 'react-toastify';
import { setPosts } from '../redux/slicers/postSlice';
const Post = ({ el }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [openComment, setOpenComment] = useState(false);
    const [deletePost, { data, isLoading, isError, isSuccess, error }] = useDeletePostMutation();
    const { posts } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changeEventHandler = (e) => {
        if (e.target.value.trim()) {
            setText(e.target.value);
        } else {
            setText("")
        }
    }

    const deleteHandler = async (id) => {
        try {
            const res = await deletePost(id).unwrap();
            if (res.message) {
                const updatedPosts = posts?.filter(post => post !== id);
                dispatch(setPosts(updatedPosts));
                //here updated data problem data not show after delete
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.message || "something wrong happened");
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Post deleted successfully");
            setOpen(false);
        }
        if (isError) {
            toast.error(error || "something wrong happened");
        }
    }, [isSuccess, isError])
    return (
        <LayoutHelmet title={"Post"} description={"this is Post"}>
            <div className='my-8 w-full max-w-sm mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar name="Rohit Patil" src={el?.author?.profilePicture || "https://bit.ly/sage-adebayo"} />
                        <h1>{el?.author?.username}</h1>
                    </div>

                    {/* Clickable Icon to Open Dialog */}

                    <Button variant="none" onClick={handleClickOpen}>
                        <MoreHorizontal size="24px" cursor="pointer" />
                    </Button>
                    <Dialog
                        open={open}
                        // TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>Actions</DialogTitle>
                        <DialogContent>
                            <Button variant='ghost' className='cursor-pointer w-fit text-[#ed4956]'>Unfollow</Button>
                            <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorite</Button>
                            {
                                user && user?._id === el?.author?._id &&
                                <Button variant='ghost' className='cursor-pointer w-fit' onClick={() => deleteHandler(el._id)}>Delete</Button>
                            }
                        </DialogContent>
                    </Dialog>
                </div>
                <img src={el?.image || "https://bit.ly/sage-adebayo"} alt="" />

                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-center gap-3'>
                        <FavoriteIcon className='cursor-pointer hover:text-gray-600' />
                        <ModeCommentOutlinedIcon onClick={() => setOpenComment(true)} className='cursor-pointer hover:text-gray-600' />
                        <Send className='cursor-pointer hover:text-gray-600' />
                    </div>
                    <BookmarkBorderOutlinedIcon />
                </div>
                <span className='font-medium block mb-2'>200 likes</span>
                <p>
                    <span>{el?.username}</span>
                    {el?.caption}
                </p>
                <span>view all 10 comments</span>
                <CommentDialog openComment={openComment} setOpenComment={setOpenComment} />
                <div className='flex justify-between'>
                    <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment' className='outline-none text-sm w-full' />
                    {text && <span className='text-[#38adf8]'>Post</span>}
                </div>
            </div>
        </LayoutHelmet>
    );
};

export default Post;
