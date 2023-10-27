import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
    let { user } = useContext(AuthContext)

    return (
        !user ? <Navigate to="/" /> : user.set_preferences ? <Outlet /> : <Navigate to="/preferences" /> 
    )
}

export default PrivateRoutes; 