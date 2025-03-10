import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSideBar from './RightSideBar'
import LayoutHelmet from './LayoutHelmet'
import useGetAllPosts from '../hooks/useGetAllPosts'

const Home = () => {
  useGetAllPosts();
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