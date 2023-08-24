import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
    return (
        <div className="site-wrapper">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
