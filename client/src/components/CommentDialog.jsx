import { Dialog, DialogContent, Avatar } from '@mui/material'
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
                                        <span>Bio here...</span>
                                    </div>
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