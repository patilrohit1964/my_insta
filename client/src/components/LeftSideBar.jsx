import React, { useEffect, useState } from 'react'
import { Heart, House, LogOut, MessageCircle, PlusSquare, Search, TrendingDown } from 'lucide-react'
import { Avatar } from "@chakra-ui/react"
import { useLazyLogoutUserQuery } from '../redux/api/authApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LayoutHelmet from './LayoutHelmet'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedIn } from '../redux/slicers/authSlice'
import CreatePost from './CreatePost'
import useGetAllPosts from '../hooks/useGetAllPosts'

const LeftSideBar = () => {
    const [logoutUser, { data, isLoading, isError, isSuccess }] = useLazyLogoutUserQuery();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const [open, setOpen] = useState();
    const sideBarItems = [
        {
            icon: <House />,
            text: "Home"
        },
        {
            icon: <Search />,
            text: "Search"
        },
        {
            icon: <TrendingDown />,
            text: "Explore"
        },
        {
            icon: <MessageCircle />,
            text: "Message"
        },
        {
            icon: <Heart />,
            text: "Notifications"
        },
        {
            icon: <PlusSquare />,
            text: "Create"
        },
        {
            icon: (<Avatar.Root className='w-6 h-6'>
                <Avatar.Fallback name="Rohit Patil" />
                <Avatar.Image src={user?.profilePicture || "https://bit.ly/sage-adebayo"} height={"100%"} width={"100%"} />
            </Avatar.Root>),
            text: "Profile"
        },
        {
            icon: <LogOut />,
            text: "Logout"
        }
    ]
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Logout Success");
            navigate("/");
        }
        if (isError) {
            toast.error("Logout failed");
        }
    }, [isSuccess, isError])

    const sideBarHandler = (text) => {
        if (text === "Logout") {
            logoutUser();
            dispatch(userLoggedIn(null));
            navigate("/login");
        } else if (text === "Create") {
            setOpen(true);
        }
    }
    return (
        <LayoutHelmet title={"Left Sidebar"} description={"left sidebar"}>
            <div className='fixed top-0 z-10 left-0 px-4 border-r border-r-gray-500 w-[16%] h-screen'>
                <div className='flex flex-col'>
                    <h1 className='my-8 pl-3 font-bold text-xl'>Logo</h1>
                    <div>
                        {sideBarItems.map((el, index) => (
                            <div key={index} onClick={() => sideBarHandler(el?.text)} className='flex items-center gap-3 relative hover:bg-gray-200 cursor-pointer rounded-lg p-3 my-3'>
                                {el.icon}
                                <span>{el.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <CreatePost open={open} setOpen={setOpen} />
            </div >
        </LayoutHelmet>
    )
}

export default LeftSideBar