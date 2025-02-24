import React from 'react'
import { Heart, House, LogOut, MessageCircle, PlusSquare, Search, TrendingDown } from 'lucide'
import { Avatar, AvatarGroup } from "@chakra-ui/react"
const sideBarItems = [
    {
        icons: <House />,
        text: "Home"
    },
    {
        icons: <Search />,
        text: "Search"
    },
    {
        icons: <TrendingDown />,
        text: "Explore"
    },
    {
        icons: <MessageCircle />,
        text: "Message"
    },
    {
        icons: <Heart />,
        text: "Notifications"
    },
    {
        icons: <PlusSquare />,
        text: "Create"
    },
    {
        icons: (
            <AvatarGroup.Root>
                <Avatar.Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK5OiMl4GWLXVP-rP0vOqbR1ZDRCB8dwadBA&s" ></Avatar.Image>
                <Avatar.Fallback name="Segun Adebayo" /><Avatar.FallBack />
            </AvatarGroup.Root>
        ),
        text: "Profile"
    },
    {
        icon: <LogOut />,
        text: "Logout"
    }
]
const LeftSideBar = () => {
    return (
        <div>
            {sideBarItems.map((el,index)=>(
                <div key={index}>
                    
                </div>
            ))}
        </div>
    )
}

export default LeftSideBar