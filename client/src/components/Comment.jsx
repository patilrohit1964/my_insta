import { Avatar } from '@mui/material'
import moment from 'moment'
import { FaRegHeart } from 'react-icons/fa'

const Comment = ({ comment }) => {
    return (
        <div className='flex gap-3'>
            <Avatar
                src={comment?.author?.profilePicture || 'https://bit.ly/sage-adebayo'}
                sx={{ width: 32, height: 32 }}
                alt='not found'
            />
            <div>
                <div className='text-sm'>
                    <span className='font-semibold mr-2'>{comment?.author?.username}</span>
                    {comment?.text}
                </div>
                <div className='flex items-center gap-3 mt-1'>
                    <span className='text-xs text-gray-500'>{moment(comment?.createdAt).fromNow()}</span>
                    <span className='text-xs text-gray-500 font-semibold cursor-pointer'>Reply</span>
                </div>
            </div>
            <FaRegHeart className='ml-auto cursor-pointer hover:opacity-70' size={12} />
        </div>
    )
}

export default Comment