import { Dialog, DialogContent, Avatar, DialogContentText, Button } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const CommentDialog = ({ openComment, setOpenComment }) => {
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <div>
            <Dialog open={openComment} maxWidth={""} onClose={() => setOpenComment(false)}>
                <DialogContent className='max-w-5xl p-0 flex flex-col'>
                    <div className='flex flex-1'>
                        <div className='w-1/2'>
                            <img src="https://bit.ly/sage-adebayo" className='w-full h-full object-cover rounded-l-lg' />
                        </div>
                        <div className='w-1/2 flex flex-col justify-between'>
                            <div className='flex items-center justify-between p-4'>
                                <div className='flex gap-3 items-center'>
                                    <Link>
                                        <Avatar src='https://bit.ly/sage-adebayo' />
                                    </Link>
                                    <div>
                                        <Link className='font-semibold text-xs'>username</Link>
                                        {/* <span>Bio here...</span> */}
                                    </div>
                                </div>
                                <MoreHorizontal className='cursor-pointer' onClick={handleOpen} />
                                <Dialog open={open} fullWidth onClose={handleClose}>
                                    {/* here ui inc */}
                                    <DialogContent className='flex flex-col items-center text-sm text-center p-4'>
                                        <div className='cursor-pointer w-full text-[#ed4956] font-bold p-3'>
                                            Unfollow
                                        </div>
                                        <div className='cursor-pointer w-full p-3'>
                                            Add to favorites
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <hr />
                            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                                comments coming
                            </div>
                            <div className='p-4'>
                                <div className='flex items-center gap-2'>
                                    <input type="text" placeholder='add comment...' className='w-full outline-none border border-gray-200 p-2' />
                                    <Button>Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CommentDialog