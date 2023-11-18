import { useContext, useState } from "react"
import { Link, Navigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext"

import herobackground from "/herobackground.jpeg";

const Login = () => {
    const { loginUser, user } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    if (user) {
        return (user.is_staff ? <Navigate to="/admin" /> : <Navigate to="/home" />)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    
    return (
        <div className="container--sign-log">
            <div className="container-form">
                <Link to="/">
					<img className="cebu--logo" src="/images/logo.png" alt="LandingPage" />
				</Link>
                <h2>Login</h2>
                <form className='modal-login-sign-form' onSubmit={(e) => loginUser(e)}>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" />

                    <label>
                    Password:
                        <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            name="password"
                        />
                        <button
                            type="button"
                            className={`toggle-password-button ${showPassword ? 'visible' : ''}`}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "👁️‍🗨️" : "👁"}
                        </button>
                        </div>
                    </label>

                    <div className="forgot-password">
                    <Link to="/forgotpass">Forgot Password</Link>
                    </div>

                    <button className='button-login-sign'>Login</button>
                    <div className="login-sign-link">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div> 
                </form>
            </div>
                <div className="container-images">
                    <img src={herobackground}/>
                </div>
        </div>
    )
}

export default Login;