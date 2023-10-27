import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PreferenceOption = ({url, name, onClick, isSelected}) => {
    return (
        <div className="preferences--option" onClick={onClick}>
            <div className="preferences--image-container">
                <img src={url} alt={name} />
                {isSelected &&
                <div className="preferences--overlay">
                    <FontAwesomeIcon icon={faCheck} />
                </div>}
            </div>
            <p>{name}</p>
        </div>
    )
}

export default PreferenceOption