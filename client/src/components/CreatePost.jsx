import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const CreatePost = ({ open, setOpen }) => {
    const createPostHandler = (e) => {
        e.preventDefault()
        try {
            
        } catch (error) {
            
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <DialogTitle>Create New Post</DialogTitle>
                    <form onSubmit={createPostHandler}></form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreatePost