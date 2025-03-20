import { lazy, Suspense, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client"
const MainLayout = lazy(() => import('./components/MainLayout'))
const Home = lazy(() => import('./components/Home'))
const Profile = lazy(() => import('./components/Profile'))
const Signup = lazy(() => import('./components/Signup'))
const Login = lazy(() => import('./components/Login'))
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/account/edit",
        element: <EditProfile />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
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
  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:4050", {
        query: {
          userId: user?._id
        }
      })
    }
  }, [])
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={browserRouter} />
      </Suspense>
    </>
  )
}

export default App
