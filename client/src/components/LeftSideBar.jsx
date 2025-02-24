import React from 'react'
import { Heart, House, LogOut, MessageCircle, PlusSquare, Search, TrendingDown } from 'lucide'
import { Avatar } from "@chakra-ui/react"
const sideBarItems = [
    {
        icons: "<House />",
        text: "Home"
    },
    {
        icons: "<Search />",
        text: "Search"
    },
    {
        icons: "<TrendingDown />",
        text: "Explore"
    },
    {
        icons: "<MessageCircle />",
        text: "Message"
    },
    {
        icons: "<Heart />",
        text: "Notifications"
    },
    {
        icons: "<PlusSquare />",
        text: "Create"
    },
    {
        icons: '<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5OiMl4GWLXVP-rP0vOqbR1ZDRCB8dwadBA&s" />',
        text: "Profile"
    },
    {
        icon: "<LogOut />",
        text: "Logout"
    }
]
const LeftSideBar = () => {
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-r-gray-500 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <h1>Logo</h1>
                <div>
                    {sideBarItems.map((el, index) => (
                        <div key={index} className='flex items-center gap-3 relative hover:bg-gray-200 cursor-pointer rounded-lg p-3 my-3'>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar