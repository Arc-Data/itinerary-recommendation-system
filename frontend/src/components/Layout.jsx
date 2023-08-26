import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AuthContext from '../context/AuthContext'

function Layout() {
    const { user } = useContext(AuthContext)
    if (!user.is_staff) {
        return (<Navigate to = '/home' />)
    }

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
