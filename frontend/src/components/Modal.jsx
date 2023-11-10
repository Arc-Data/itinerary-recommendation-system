const Modal = ({onClose, children}) => {
    return (
        <>
            <div className="overlay" onClick={onClose}></div>   
            <div className="modal">
            {children}
            </div>
        </>
    )
}

export default Modal