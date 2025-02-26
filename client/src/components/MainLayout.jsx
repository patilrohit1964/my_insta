import React from 'react'
import LeftSideBar from './LeftSideBar'
import { Outlet } from 'react-router-dom'
import LayoutHelmet from './LayoutHelmet'

const MainLayout = () => {
    return (
        <LayoutHelmet title={"MainLayout"} description={"this is MainLayout"}>
            <div>
                <LeftSideBar />
                <div>
                    <Outlet />
                </div>
            </div>
        </LayoutHelmet>
    )
}

export default MainLayout