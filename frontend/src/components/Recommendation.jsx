const Recommendation = ({recommendation}) => {
    const displayItem = recommendation && recommendation.locations.map(item => {
        return (
            <div key={item.id}>{item.name}</div>
        )
    })
    
    return (
        <div className="assistant--recommendation">
            {displayItem}
        </div>
    )
}

export default Recommendation