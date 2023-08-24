import { useRef, useEffect } from "react";

const Modal = ({ onClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
            }
        };

        document.body.classList.add("modal--open")
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.body.classList.remove("modal--open")
            document.removeEventListener("click", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal--overlay">
            <div className="modal--login" ref={modalRef}>
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
