import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserProfile from '../hooks/useGetUserProfile';
import LayoutHelmet from './LayoutHelmet';

const Profile = () => {
  // const { userProfile } = useSelector(state => state.auth);
  const { id } = useParams()
  const { data, isError } = useGetUserProfile(id);
  const isLoggedUser = false
  const Follow = true
  console.log(data)
  return (
    <LayoutHelmet title={"Profile"} description={"this is Profile"}>
      <div>
        <div className='flex max-w-5xl justify-center mx-auto pl-10 pt-10'>
          <div className='grid grid-cols-2 justify-around'>
            <div className='flex items-center justify-center w-32 h-32'>
              <img src={data?.user?.profilePicture} className='h-full w-full object-center rounded-full' />
            </div>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>{data?.user?.username}</span>
                {
                  isLoggedUser ? (
                    <>
                      <Button variant='secondary' className='hover:bg-gray-200'>Edit Profile</Button>
                      <Button variant='secondary' className='hover:bg-gray-200'>View archive</Button>
                      <Button variant='secondary' className='hover:bg-gray-200'>Ad tools</Button>
                    </>
                  ) : (
                    Follow ?
                      <>
                        <button className='bg-gray-300 hover:bg-gray-600 p-2 rounded-md transition-all duration-300 hover:text-white'>Unfollow</button>
                        <button className='bg-gray-300 hover:bg-gray-600 p-2 rounded-md transition-all duration-300 hover:text-white'>Message</button>
                      </>
                      : (
                        <button className='bg-[#0095f6] hover:bg-[#59a8dc] p-2 text-white rounded-md'>Follow</button>
                      )
                  )
                }
              </div>
              <div className='flex items-center justify-around'>
                <p><span className="font-semibold">{data?.user?.posts?.length}</span> Post</p>
                <p><span className="font-semibold">{data?.user?.following?.length}</span> Post</p>
                <p><span className="font-semibold">{data?.user?.followers?.length}</span> Post</p>
              </div>
              <div>
                <span>{data?.user?.bio || "bio here..."}</span>
                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-blue-500 ring-inset">
                  {user?.username}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutHelmet>
  )
}

export default Profile