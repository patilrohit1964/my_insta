
import { Avatar } from '@mui/material'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import { Heart, House, LogOut, MessageCircle, PlusSquare, Search, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLazyLogoutUserQuery } from '../redux/api/authApi'
import { userLoggedIn } from '../redux/slicers/authSlice'
import CreatePost from './CreatePost'
import LayoutHelmet from './LayoutHelmet'
const LeftSideBar = () => {
    const [logoutUser, { data, isLoading, isError, isSuccess }] = useLazyLogoutUserQuery();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const { likeNotification } = useSelector(state => state.rtn);
    const [open, setOpen] = useState(false);
    const sideBarItems = [
        {
            icon: <House />,
            text: "Home"
        },
        {
            icon: <Search />,
            text: "Search"
        },
        {
            icon: <TrendingDown />,
            text: "Explore"
        },
        {
            icon: <MessageCircle />,
            text: "Message"
        },
        {
            icon: <Heart />,
            text: "Notifications"
        },
        {
            icon: <PlusSquare />,
            text: "Create"
        },
        {
            icon: (<Avatar className='w-6 h-6' src={user?.profilePicture || "https://bit.ly/sage-adebayo"} height={"100%"} width={"100%"} />
            ),
            text: "Profile"
        },
        {
            icon: <LogOut />,
            text: "Logout"
        }
    ]
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Logout Success");
            navigate("/");
        }
        if (isError) {
            toast.error("Logout failed");
        }
    }, [isSuccess, isError]);

    const sideBarHandler = (text) => {
        if (text === "Logout") {
            logoutUser();
            dispatch(userLoggedIn(null));
            navigate("/login");
        } else if (text === "Create") {
            setOpen(true);
        } else if (text === "Profile") {
            navigate(`/profile/${user?._id}`);
        }
        else if (text === "Home") {
            navigate(`/`);
        } else if (text === "Message") {
            navigate("/chat")
        }
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);
    const id = openPop ? 'simple-popover' : undefined;
    return (
        <LayoutHelmet title={"Left Sidebar"} description={"left sidebar"}>
            <div className='fixed top-0 z-10 left-0 px-4 border-r border-r-gray-500 w-[16%] h-screen'>
                <div className='flex flex-col'>
                    <h1 className='my-8 pl-3 font-bold text-xl'>Logo</h1>
                    <div>
                        {sideBarItems.map((el, index) => (
                            <div key={index} onClick={() => sideBarHandler(el?.text)} className='flex items-center gap-3 relative hover:bg-gray-200 cursor-pointer rounded-lg p-3 my-3'>
                                {el.icon}
                                <span>{el.text}</span>
                                {
                                    el?.text === "Notifications" && likeNotification?.length > 0 && (
                                        <div>
                                            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                                                {likeNotification?.length}
                                            </Button>
                                            <Popover
                                                id={id}
                                                open={openPop}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >{
                                                    likeNotification?.map((notifi) => {
                                                        console.log(notifi, "notification details")
                                                        return (
                                                            <div key={notifi.userId} className='flex items-center gap-2 my-2'>
                                                                <Avatar src={notifi.userDetails?.profilePicture} />
                                                                <p className='text-sm'><span className='font-bold'>{notifi.userDetails?.username}</span> liked your post</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Popover>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                </div>
                <CreatePost open={open} setOpen={setOpen} />
            </div >
        </LayoutHelmet>
    )
}

export default LeftSideBar