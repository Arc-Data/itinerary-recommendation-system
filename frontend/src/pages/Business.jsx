import { Link } from "react-router-dom"
import useBusinessManager from "../hooks/useBusinessManager"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"

const Business = () => {
    const { authTokens } = useContext(AuthContext)
    const { requests, loading, error, getApprovalRequests} = useBusinessManager(authTokens)

    const displayRequests = requests && requests.map(request => {
        return (
            <div key={request.id}>{request.is_approved ? "Approved" : "Nah"}</div>
        )   
    })

    useEffect(() => {
        getApprovalRequests()
    }, [])

    return (
        <div>
            <div className="business--header">
                <p className="header-title">Business</p>
                <Link to="add">
                    <button className="business--btn">
                        <img src="/plus.svg" />
                        <p>Add Business</p>
                    </button>
                </Link>
            </div>
            <div>  
                {displayRequests}
            </div>
        </div>
    )
}

export default Business