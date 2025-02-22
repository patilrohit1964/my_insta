import React from 'react'
import { Input } from "@chakra-ui/react"
const Signup = () => {
  return (
    <div>
      <div className='flex items-center w-screen h-screen justify-center'>
        <form action="" className='shadow-lg flex flex-col gap-5 p-8'>
          <div>
            <h1>logo</h1>
            <p>Signup to see photos videos from your friends</p>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <Input type="text" className='focus-visible:ring-transparent' name='username' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup