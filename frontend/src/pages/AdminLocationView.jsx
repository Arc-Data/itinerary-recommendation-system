import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import useLocationManager from "../hooks/useLocationManager"
import { useNavigate, useParams } from "react-router-dom"
import Error404 from "../components/Error404"

const AdminLocationView = () => {
    const { authTokens } = useContext(AuthContext)
    const { location, error, loading, getLocation, deleteLocation } = useLocationManager(authTokens)
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDelete = async () => {
        await deleteLocation(id)
        navigate('/admin')
    }
    
    useEffect(() => {
        getLocation(id)
    }, [])

    if (loading) {
        return (
            <div className="admin-wrapper">
                Loading Location Data
            </div>
        )
    }

    if (error && error === 404) {
        return (
            <div className="admin-wrapper">
                <Error404 />
            </div>
        )
    } else if (error) {
        <div className="admin-wrapper">
            Something wrong occured.
        </div>
    }

    return (
        <div className="admin-wrapper">
            <div>
                <h1>{location?.name}</h1>
                <button
                    className="delete-btn"
                    onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default AdminLocationView