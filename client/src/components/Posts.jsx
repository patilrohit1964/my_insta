import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
    const { posts } = useSelector(state => state.post)
    return (
        <div>
            {
                posts?.map((el, idx) => (
                    <Post key={idx} el={el} />
                ))
            }
        </div>
    )
}

export default Posts