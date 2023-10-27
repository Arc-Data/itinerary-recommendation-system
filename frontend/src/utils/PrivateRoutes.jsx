import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
    let { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    
        else if (user.is_staff) {
            navigate("/admin")
        }
    
        else if (!user.set_preferences) {
            navigate("/preferences")
        }
    })

    return (
        <Outlet />
    )
}

export default PrivateRoutes; 