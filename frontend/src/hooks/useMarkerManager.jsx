import { useState } from "react"

const useMarkerManager = () => {
    const [ markers, setMarkers] = useState([])
    
    const addMarker = (latitude, longitude, color) => {
		const mapMarkers = [...markers]
		mapMarkers.push({
			lng: longitude,
			lat: latitude,
			color: color,
		})

		setMarkers(mapMarkers)
	}

    const deleteMarker = (latitude, longitude) => {
		const mapMarkers = markers.filter(i => i.lng !== longitude && i.lat !== latitude)
		setMarkers(mapMarkers)
	}

    const getMarkersData = (days) => {
        const locations = []
        const mapMarkers = []

        if(days) {
            days.forEach((day, idx) => {
                console.log("Day ", idx)
                console.log(day)

                day.itinerary_items.forEach(location => {
                    console.log("location", location)
                    locations.push(location)
                    mapMarkers.push({
                        lng: location.details.longitude,
                        lat: location.details.latitude,
                        color: day.color,
                    })
                })
            })
        }

        setMarkers(mapMarkers)

        return locations

    }


    return {
        markers,
        addMarker,
        deleteMarker,
        getMarkersData,
    }
}

export default useMarkerManager