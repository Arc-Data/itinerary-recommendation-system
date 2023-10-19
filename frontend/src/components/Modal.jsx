import { useEffect, useRef } from "react"

const Modal = ({onClose, children}) => {
    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(!modalRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.body.addEventListener("click", handleClickOutside)

        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }

    })

    return (
        <>
            <div className="overlay" ref={modalRef}></div>   
            <div ref={modalRef} className="modal">
            {children}
            </div>
        </>
    )
}

export default Modal