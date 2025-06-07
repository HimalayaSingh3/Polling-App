import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <nav>
            <Navbar/>
        </nav>
        <main className="container mx-auto p-4">
            <Outlet />
        </main>
    </div>
  )
}

export default Layout