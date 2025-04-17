import { Outlet } from 'react-router-dom'
import LayoutHelmet from './LayoutHelmet'
import LeftSideBar from './LeftSideBar'

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