import React from 'react'
import { Avatar, Button, Dialog } from "@chakra-ui/react"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@chakra-ui/react"
import { MoreHorizontal } from 'lucide-react'
const Post = () => {
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar.Root className='w-6 h-6'>
                        <Avatar.Fallback name="Rohit Patil" />
                        <Avatar.Image src="https://bit.ly/sage-adebayo" />
                    </Avatar.Root>
                    <h1>username</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col items-center text-sm text-center'>
                        <Button variant="ghost" className='cursor-pointer w-fit text-[#ed4956]'>Unfollow</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )

}

export default Post