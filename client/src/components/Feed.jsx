import LayoutHelmet from './LayoutHelmet'
import Posts from './Posts'
const Feed = () => {
    return (
        <LayoutHelmet title={"Feed"} description={"this is Feed"}>
            <div className='flex-1 my-0 flex flex-col items-center pl-[20%]'>
                <Posts />
            </div>
        </LayoutHelmet>
    )
}

export default Feed