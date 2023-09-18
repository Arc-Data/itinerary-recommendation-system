import { Link } from "react-router-dom"

const Itinerary = ({itinerary}) => {
    console.log(itinerary)

    return (
        <div>
            <Link to = "/home">
                <img 
                    src={`http://127.0.0.1:8000${itinerary.image}`} 
                    height={200}
                    width={200}
                    className="itinerary--image"
                    alt="" />
            </Link>
            <p>Insert Location Name</p>
        </div>
    )
}

export default Itinerary