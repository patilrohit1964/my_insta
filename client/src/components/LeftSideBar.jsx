import React, { useEffect } from 'react'
import { Heart, House, LogOut, MessageCircle, PlusSquare, Search, TrendingDown } from 'lucide-react'
import { Avatar } from "@chakra-ui/react"
import { useLazyLogoutUserQuery } from '../redux/api/authApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
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
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>),
        text: "Profile"
    },
    {
        icon: <LogOut />,
        text: "Logout"
    }
]
const LeftSideBar = () => {
    const [logoutUser, { data, isLoading, isError, isSuccess }] = useLazyLogoutUserQuery();
    const navigate = useNavigate();
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
            navigate("/login")
        }
    }
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-r-gray-500 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <h1>Logo</h1>
                <div>
                    {sideBarItems.map((el, index) => (
                        <div key={index} onClick={() => sideBarHandler(el?.text)} className='flex items-center gap-3 relative hover:bg-gray-200 cursor-pointer rounded-lg p-3 my-3'>
                            {el.icon}
                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar