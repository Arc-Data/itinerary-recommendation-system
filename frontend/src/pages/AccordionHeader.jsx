import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AccordionHeader = ({handleClick, icon, text, active}) => {
    return (
        <div 
            className={`accordion-header ${active ? "active": ""}`} 
            onClick={handleClick}>
            <FontAwesomeIcon icon={icon}/>
            <p>{text}</p>
        </div>
    )
}

export default AccordionHeader