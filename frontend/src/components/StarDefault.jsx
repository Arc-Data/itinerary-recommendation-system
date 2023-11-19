const StarDefault = ({ color, onClick }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="37" className="star" viewBox="0 0 40 37" fill="none" onClick={onClick}>
          <path d="M19.9992 30.8575L29.3367 36.505C31.0467 37.54 33.1392 36.01 32.6892 34.075L30.2142 23.455L38.4717 16.3C39.9792 14.995 39.1692 12.52 37.1892 12.3625L26.3217 11.44L22.0692 1.40496C21.3042 -0.417539 18.6942 -0.417539 17.9292 1.40496L13.6767 11.4175L2.80925 12.34C0.829248 12.4975 0.0192478 14.9725 1.52675 16.2775L9.78425 23.4325L7.30925 34.0525C6.85925 35.9875 8.95175 37.5175 10.6617 36.4825L19.9992 30.8575Z" fill={color}/>
        </svg>
    )
}

export default StarDefault