import React from 'react'
import Post from './Post'
import LayoutHelmet from './LayoutHelmet'

const Posts = () => {
    return (
        <LayoutHelmet title={"Posts"} description={"this is Posts"}>
            <div>
                {
                    [1, 2, 3, 4, 5].map((el, idx) => (
                        <Post key={idx} />
                    ))
                }
            </div>
        </LayoutHelmet>
    )
}

export default Posts