import React from 'react'
import { Input, Field } from "@chakra-ui/react"
const Signup = () => {
  return (
    <div>
      <div className='flex items-center h-screen justify-center'>
        <form action="" className='shadow-lg flex flex-col gap-5 p-8 border border-orange-800'>
          <div className='my-4'>
            <h1>logo</h1>
            <p className='text-red-600 p-20'>Signup to see photos videos from your friends</p>
          </div>
          <div>
            <Field.Root>
              <Field.Label htmlFor="username" className='font-medium'>Username</Field.Label>
              <Input type="text" className='focus-visible:ring-transparent my-2' name='username' />
            </Field.Root>
          </div>
          <div>
            <Field.Root>
              <Field.Label htmlFor="username" className='font-medium'>Email</Field.Label>
              <Input type="email" className='focus-visible:ring-transparent my-2' name='username' />
            </Field.Root>
          </div>
          <div>
            <Field.Root>
              <Field.Label htmlFor="username" className='font-medium'>Username</Field.Label>
              <Input type="text" className='focus-visible:ring-transparent my-2' name='username' />
            </Field.Root>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup