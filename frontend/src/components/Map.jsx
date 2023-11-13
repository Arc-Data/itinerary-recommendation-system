import React, { useEffect, useRef, useState } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css"

const Map = ({markers}) => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY
    const mapContainer = useRef(null)
    const map = useRef(null)
    const cebu = { lng: 123.8854, lat: 10.3157 }
    const [zoom] = useState(11)
    const markerRefs = useRef([])

	maptilersdk.config.apiKey = apiKey

    const addMarkersToMap = () => {
        if(!map.current || !markers) return;

        markerRefs.current.forEach(marker => marker.remove())
        markerRefs.current = [];

        markers.forEach((markerCoords) => {
            const newMarker = new maptilersdk.Marker({ color: markerCoords.color })
                .setLngLat(markerCoords)
                .addTo(map.current);

            markerRefs.current.push(newMarker);
        })
    }

    useEffect(() => {
        if(map.current) return; 

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [cebu.lng, cebu.lat],
            zoom: zoom
        })


    }, [cebu.lng, cebu.lat, zoom])

    useEffect(() => {
        

        addMarkersToMap()
    }, [markers])
    

    return (
        <div className='create--map-wrap'>
            <div ref={mapContainer} className='create--map'></div>
        </div>
    )
}

export default Map