import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Avatar, For, HStack } from "@chakra-ui/react"
import LayoutHelmet from './LayoutHelmet'
const Post = () => {
    return (
        <LayoutHelmet title={"Post"} description={"this is Post"}>
            <div className='my-8 w-full max-w-sm mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar.Root>
                            <Avatar.Fallback name="Rohit Patil" />
                            <Avatar.Image src="https://bit.ly/sage-adebayo" />
                        </Avatar.Root>
                        <h1>username</h1>
                    </div>
                </div>
                <img src="https://bit.ly/sage-adebayo" alt="" />
            </div>
        </LayoutHelmet>
    )

}

export default Post