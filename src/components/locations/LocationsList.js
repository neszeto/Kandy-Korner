import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LocationsList.css"

export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationsArray) => {
                setLocations(locationsArray)
            })
        },
        []

    )
    
    
    
    
    return <>
        <h2>List of Store Locations</h2>
        <article className="storeLocations">
            {
                locations.map(location => <div key={`location--${location.id}`}>{location.address} is {location.size} square feet</div>)
            }

        </article>
    
    </>
}