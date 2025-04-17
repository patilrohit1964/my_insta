import { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client"
import './App.css'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import ProtectedRoute from './components/ProtectedRoute'
import { setOnlineUsers } from './redux/slicers/chatSlice'
import { setLikeNotification } from './redux/slicers/rtnSlice'
import { setSocket } from './redux/slicers/socketSlice'
const MainLayout = lazy(() => import('./components/MainLayout'))
const Home = lazy(() => import('./components/Home'))
const Profile = lazy(() => import('./components/Profile'))
const Signup = lazy(() => import('./components/Signup'))
const Login = lazy(() => import('./components/Login'))
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
      {
        path: "/profile/:id",
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: "/account/edit",
        element: <ProtectedRoute><EditProfile /></ProtectedRoute>,
      },
      {
        path: "/chat",
        element: <ProtectedRoute><ChatPage /></ProtectedRoute>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
])
function App() {
  const { user } = useSelector(state => state?.auth);
  const { socket } = useSelector(state => state?.socket)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:4050", {
        query: {
          userId: user?._id
        },
        transports: ["websocket"]
      })
      dispatch(setSocket(socketio));
      // const socketio = connectSocket(user._id);
      // listen all the events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      })
      return () => {
        // disconnectSocket();
        socketio.close();
        dispatch(setSocket(null))
      };
    } else if (socket) {
      // disconnectSocket();
      socket.close();
      dispatch(setSocket(null))
    }
  }, [user, dispatch]);

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={browserRouter} />
      </Suspense>
    </>
  )
}

export default App
