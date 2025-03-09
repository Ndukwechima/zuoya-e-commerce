import React from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
    {/* Header */}
        <Header />
        {/* Main content */}
        {/* Main contents */}
        <main>
          <Outlet />
        </main>
        {/* Footer */}
        <Footer />
    </>
  )
}

export default UserLayout