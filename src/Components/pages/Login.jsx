import React from 'react'
import { SignInButton } from "@clerk/clerk-react";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-black/85 h-[40%] w-[30%] flex justify-center items-center rounded-lg">
        <SignInButton className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition' />
      </div>
    </div>
  )
}

export default Login