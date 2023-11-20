import { Link } from "react-router-dom"
import useBusinessManager from "../hooks/useBusinessManager"
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import dayjs from "dayjs"

const Business = () => {
    const { authTokens } = useContext(AuthContext)
    const { requests, loading, error, getApprovalRequests} = useBusinessManager(authTokens)

    const displayRequests = requests && requests.map(request => {
        return (
            <tr key={request.id}>
                <td>{request.details.name}</td>
                <td>
                    {request.details.location_type === '1' ? 
                    "Tourist Spot"
                    :
                    request.details.location_type === '2' ?
                    "Food Place"
                    :
                    "Accomodation"
                    }
                </td>
                <td>{dayjs(request.timestamp).format("MMMM D YYYY")}</td>
                <td><button disabled className="request--status">For Approval</button></td>
            </tr>
        )   
    })

    useEffect(() => {
        getApprovalRequests()
    }, [])

    return (
        <div className="profile--main-content">
            <div className="business--header">
                <p className="header-title">Business</p>
            </div>
            <div className="requests--table">  
                <div className="flex-between">
                    <p className="requests--title">Application Requests</p>
                    <Link to="add">
                        <button className="business--btn">
                            <img src="/plus.svg" />
                            <p>Add Business</p>
                        </button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Location Type</th>
                        <th>Date Filled</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {displayRequests}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Business