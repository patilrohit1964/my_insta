import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import { createBrowserRouter, Route, Routes } from 'react-router-dom'
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
  }
])
function App() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
