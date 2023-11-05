const Assistant = ({onClose}) => {
    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="assistant">
                <div>
                    Header
                </div>
                <div>
                    Content
                </div>
            </div>
        </>
    )
}

export default Assistant