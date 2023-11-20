import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import useBusinessManager from "../hooks/useBusinessManager"
import dayjs from "dayjs"
import RequestModal from "../components/RequestModal"

const Request = () => {
    const { authTokens } = useContext(AuthContext)
    const { requests, error, loading, getAllApprovalRequests } = useBusinessManager(authTokens) 

    const [isOpenDetails, setOpenDetails] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState()

    const toggleDetails = (request) => {
        setSelectedRequest(request)
        setOpenDetails(prev => !prev)
    }

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
                <td><button className="view-details" onClick={() => toggleDetails(request)}>View Details</button></td>
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
                        <td>Name</td>
                        <td>Location Type</td>
                        <td>Owner</td>
                        <td>Date Filled</td>
                        <td>Status</td>
                        <td>Action</td>
                    </thead>
                    <tbody>
                        {displayRequests}
                    </tbody>
                </table>
            </div>
            {isOpenDetails &&
            <RequestModal onClose={toggleDetails} request={selectedRequest}/>
            }
        </div>
    )
}

export default Request