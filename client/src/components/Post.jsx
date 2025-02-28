import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MoreHorizontal, Send } from 'lucide-react';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import LayoutHelmet from "./LayoutHelmet"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
const Post = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <LayoutHelmet title={"Post"} description={"this is Post"}>
            <div className='my-8 w-full max-w-sm mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar name="Rohit Patil" src="https://bit.ly/sage-adebayo" />
                        <h1>username</h1>
                    </div>

                    {/* Clickable Icon to Open Dialog */}

                    <Button variant="none" onClick={handleClickOpen}>
                        <MoreHorizontal size="24px" cursor="pointer" onClick={handleClickOpen} />
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
                            <Button variant='ghost' className='cursor-pointer w-fit'>Delete</Button>
                        </DialogContent>
                    </Dialog>
                </div>
                <img src="https://bit.ly/sage-adebayo" alt="" />
                <div className=''>
                    <div className='flex items-center justify-between my-2'>
                        <div className='flex items-center gap-3'>
                            <FavoriteIcon className='cursor-pointer hover:text-gray-600' />
                            <ModeCommentOutlinedIcon className='cursor-pointer hover:text-gray-600' />
                            <Send className='cursor-pointer hover:text-gray-600' />
                        </div>
                    </div>
                    <BookmarkBorderOutlinedIcon />
                </div>
            </div>
        </LayoutHelmet>
    );
};

export default Post;
