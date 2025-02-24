import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter, Route, Routes, RouterProvider } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }
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
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
