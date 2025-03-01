import { Dialog, DialogContent, Avatar, DialogContentText } from '@mui/material'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


const CommentDialog = ({ openComment, setOpenComment }) => {
    return (
        <div>
            <Dialog open={openComment}>
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
                                <Dialog>
                                    {/* here ui inc */}
                                    <DialogContent className='flex flex-col items-center text-sm text-center'>
                                        <MoreHorizontal className='bg-red-500' />
                                        <div className='cursor-pointer w-full text-[#ed4956] font-bold'>
                                            Unfollow
                                        </div>
                                        <div className='cursor-pointer w-full'>
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
                                <div>
                                    <input type="text" placeholder='add comment...' className='w-full outline-none border border-gray-200 p-2' />
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