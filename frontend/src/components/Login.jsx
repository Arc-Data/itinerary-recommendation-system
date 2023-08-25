import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    
    return (
        <div>
            <h2 className='modal-login-sign-text'>Login</h2>
            <form className='modal-login-sign-form' onSubmit={loginUser}>
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

                <button className='button-login-sign'>Login</button>
            </form>
            {/* <div className="login-sign-link">
                Don't have an account? <Link to="/sign">Sign Up</Link>
            </div> */}
        </div>
    )
}

export default Login;