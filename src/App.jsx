import React from 'react'
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import DashboardPage from './Components/pages/Dashboard'
import Login from './Components/pages/Login';

function App() {
  return (
    <div>
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <DashboardPage />
      </SignedIn> 
    </div>
  )
}

export default App