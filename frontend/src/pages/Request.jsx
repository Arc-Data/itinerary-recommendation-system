import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import useBusinessManager from "../hooks/useBusinessManager"
import dayjs from "dayjs"

const Request = () => {
    const { authTokens } = useContext(AuthContext)
    const { requests, error, loading, getAllApprovalRequests } = useBusinessManager(authTokens) 

    console.log(requests)

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
                <td>{request.requester.first_name} {request.requester.last_name}</td>
                <td>{dayjs(request.timestamp).format("MMMM D YYYY")}</td>
                <td><button disabled className="request--status">For Approval</button></td>
            </tr>
        )   
    })

    useEffect(() => {
        getAllApprovalRequests()
    }, [])

    return (
        <div>
            <p className="header-title">Requests</p>
            <div className="requests--table">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Location Type</th>
                        <th>Owner</th>
                        <th>Date Filled</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {displayRequests}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Request