import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import '../App.css'

const AdminRoutes = () => {
    const { user } = useContext(AuthContext)    
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!user) {
            navigate('/')
        } 
    
        else if(!user.is_staff) {
            navigate('/home')
        }

    })

    return (
        <div className="site-wrapper">
            <Sidebar />
            <main className="admin--main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminRoutes