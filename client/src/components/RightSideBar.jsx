import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LayoutHelmet from './LayoutHelmet'
import SuggestedUser from './SuggestedUser'

const RightSideBar = () => {
  const { user, suggestedUsers } = useSelector(state => state.auth);
  return (
    <LayoutHelmet title={"Right Sidebar"} description={"this is Right Sidebar"} >
      <div className='w-fit my-10 pr-10'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${user?._id}`} className='hover:opacity-80'>
            <Avatar src={user?.profilePicture} alt='not found' />
          </Link>
          <div className='flex flex-col items-center'>
            <Link to={`/profile/${user?._id}`} className='font-semibold text-sm hover:text-gray-500'>{user?.username}</Link>
            <span className='text-gray-600 text-sm'>{user?.bio || "Bio here..."}</span>
          </div>
        </div>
        <SuggestedUser suggestedUsers={suggestedUsers} />
      </div>
    </LayoutHelmet>
  )
}

export default RightSideBar