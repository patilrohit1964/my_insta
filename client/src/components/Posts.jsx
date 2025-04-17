import { useSelector } from 'react-redux'
import Post from './Post'

const Posts = () => {
    const { posts } = useSelector(state => state.post)

    return (
        <div>
            {
                posts?.map((el, idx) => (
                    <Post key={el?._id} el={el} />
                ))
            }
        </div>
    )
}

export default Posts