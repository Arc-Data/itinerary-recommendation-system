import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Login = ({onClose}) => {
    const [showPassword, setShowPassword] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [onClose])

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    
    return (
        <div className="modal--overlay">
            <div className="modal--login" ref={modalRef}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2 className='modal-login-sign-text'>Login</h2>
                <form className='modal-login-sign-form'>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" />

                    <label>
                    Password:
                    <div className="password-input">
                        <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className={`toggle-password-button ${showPassword ? 'visible' : ''}`}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "👁️‍🗨️" : "👁"}
                        </button>
                        </div>
                    </div>
                    </label>

                    <div className="forgot-password">
                    <a href="#">Forgot your Password?</a>
                    </div>

                    <button className='button-login-sign' type="submit">Login</button>
                </form>
                <div className="login-sign-link">
                    Don't have an account? <Link to="/sign">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;