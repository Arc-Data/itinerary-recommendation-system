const TripSearchResults = ({searchData}) => {
    const displaySearchCard = searchData && searchData.map(location => {
        return (<div key={location.id}>{location.name}</div>)
    })

    return searchData === null ? null : (
        <div>
            {displaySearchCard}
        </div>
    )
}

export default TripSearchResults;