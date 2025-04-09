import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MoreHorizontal, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useBookMarkPostQuery, useCommentPostMutation, useDeletePostMutation, useLikePostMutation } from '../redux/api/postApi';
import { setPosts, setSelectedPost } from '../redux/slicers/postSlice';
import CommentDialog from './CommentDialog';
import LayoutHelmet from "./LayoutHelmet";
const Post = ({ el }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [openComment, setOpenComment] = useState(false);
    const [deletePost, { data, isError, isSuccess, error }] = useDeletePostMutation();
    const [commentPost, { data: commentData, isLoading: commentLoading, isError: commentError, isSuccess: commentSuccess, error: commentErr }] = useCommentPostMutation();
    const [likePost, { data: likeDisLikeData, isLoading: likeDisLoading, isError: likeDisError, isSuccess: likeDisSuccess }] = useLikePostMutation();
    const { data: bookMarkData, isLoading: isLoadingMarkData, isSuccess: bookMarkSuccess } = useBookMarkPostQuery(el?._id);
    const { posts } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);
    const [isLiked, setIsLiked] = useState(el?.likes?.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(el?.likes?.length)
    const [comment, setComment] = useState(el.comments);
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
            setText("");
        }
    }

    const likeDisLikeHandler = async (id) => {
        try {
            const action = isLiked ? "dislike" : "like";
            const res = await likePost({ id, action }).unwrap();
            const updateLikes = isLiked ? postLike - 1 : postLike + 1;
            setPostLike(updateLikes);
            setIsLiked(!isLiked);

            // update post after like and dislike
            const updatedPosts = posts?.map(p => p._id === id ? { ...p, likes: isLiked ? p.likes?.filter(likeId => likeId !== user?._id) : [...p.likes, user?._id] } : p);
            dispatch(setPosts(updatedPosts));
            // here error in like or dislike
            toast.success(res.message);
        } catch (error) {
            console.log(error);
            toast.error(error?.message || "something wrong happened");
        }
    }

    const deleteHandler = async (id) => {
        try {
            const res = await deletePost(id).unwrap();
            if (res.message) {
                const updatedPosts = posts?.filter(post => post._id !== id);
                dispatch(setPosts(updatedPosts));
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.message || "something wrong happened");
        }
    }

    const commentHandler = async (id) => {
        if (!text.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }
        try {
            const res = await commentPost({ id, text }).unwrap();
            if (res?.success) {
                const updatedPostCommentData = [...comment, res?.comment];
                setComment(updatedPostCommentData);
                const updatedPostData = posts.map(p => p._id === el._id ? { ...p, comments: updatedPostCommentData } : p);
                dispatch(setPosts(updatedPostData));
                toast.success(res?.message || "comment added");
                setText("");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error(error?.message || "Something went wrong");
        }
    };

    const bookMarkHandler = async () => {
        if (bookMarkSuccess) {
            console.log(bookMarkData, "book mark data");
            toast.success(bookMarkData?.message || "bookmarked this post")
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
                    <div className='flex items-center gap-2 mb-2'>
                        <Avatar name="Rohit Patil" src={el?.author?.profilePicture || "https://bit.ly/sage-adebayo"} />
                        <div className='flex items-center gap-4'>
                            <h1>{el?.author?.username}</h1>
                            {
                                user?._id === el?.author?._id &&
                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-blue-500 ring-inset">
                                    Badge
                                </span>
                            }
                        </div>
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
                            {
                                el?.author?._id !== user?._id &&
                                <Button variant='ghost' className='cursor-pointer w-fit text-[#ed4956]'>Unfollow</Button>
                            }
                            <Button variant='ghost' className='cursor-pointer w-fit'>Add to favorite</Button>
                            {
                                user && user?._id === el?.author?._id &&
                                <Button variant='ghost' className='cursor-pointer w-fit' onClick={() => deleteHandler(el._id)}>Delete</Button>
                            }
                        </DialogContent>
                    </Dialog>
                </div>
                <img src={el?.image || "https://bit.ly/sage-adebayo"} alt="image not found" />

                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-center gap-3'>
                        {
                            isLiked ?
                                <FaHeart className={`cursor-pointer text-2xl hover:text-pink-300 ${isLiked && 'text-pink-400'}`} onClick={() => likeDisLikeHandler(el._id)} />
                                :
                                <FaRegHeart className={`cursor-pointer text-2xl hover:text-gray-600 ${isLiked && 'text-pink-400'}`} onClick={() => likeDisLikeHandler(el._id)} />
                        }
                        <ModeCommentOutlinedIcon
                            onClick={() => {
                                dispatch(setSelectedPost(el));
                                setOpenComment(true);
                            }}
                            className='cursor-pointer hover:text-gray-600'
                        />
                        <Send className='cursor-pointer hover:text-gray-600' />
                    </div>
                    <BookmarkBorderOutlinedIcon className='cursor-pointer' onClick={bookMarkHandler} />
                </div>
                <span className='font-medium block mb-2'>{postLike} likes</span>
                <p>
                    <span>{el?.author?.username}</span>{" "}
                    {el?.caption}
                </p>
                {comment?.length > 0 &&
                    <span
                        className='cursor-pointer'
                        onClick={() => {
                            dispatch(setSelectedPost(el));
                            setOpenComment(true);
                        }}
                    >
                        View all {comment?.length} comments
                    </span>
                }
                <CommentDialog
                    openComment={openComment}
                    setOpenComment={setOpenComment}
                    el={el}
                    postLike={postLike}
                    posts={posts}
                    isLiked={isLiked}
                />
                <div className='flex justify-between'>
                    <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment' className='outline-none text-sm w-full' />
                    {text && <Button className='text-[#38adf8]' onClick={() => commentHandler(el._id)}>Post</Button>}
                </div>
            </div>
        </LayoutHelmet>
    );
};

export default Post;
