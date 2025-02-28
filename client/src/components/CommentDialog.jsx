import { Dialog, DialogContent } from '@mui/material'
import React from 'react'

const CommentDialog = ({ openComment, setOpenComment }) => {
    return (
        <div>
            <Dialog open={openComment}>
                <DialogContent>
                    <img src="https://bit.ly/sage-adebayo" />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CommentDialog