import { Outlet } from 'react-router-dom'
import useGetAllPosts from '../hooks/useGetAllPosts'
import usetGetSuggestedUsers from '../hooks/useGetSuggestedUsers'
import Feed from './Feed'
import LayoutHelmet from './LayoutHelmet'
import RightSideBar from './RightSideBar'

const Home = () => {
  useGetAllPosts();
  usetGetSuggestedUsers();
  return (
    <LayoutHelmet title={"Home"} description={"this is Home"}>
      <div className='flex '>
        <div className='flex-grow'>
          <Feed />
          <Outlet />
        </div>
        <RightSideBar />
      </div>
    </LayoutHelmet>
  )
}

export default Home