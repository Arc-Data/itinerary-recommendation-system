import { useContext, useState } from "react"
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext"
/*Images*/
import herobackground from "/herobackground.jpeg";

const ForgotPassword = () => {
    const { loginUser } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }
    
    return (
        <div className="container--sign-log">
            <div className="container-form">
                <Link to="/">
					<img className="cebu--logo" src="/images/logo.png" alt="LandingPage" />
				</Link>
                <h2>Forgot Password</h2>
                <form className='modal-login-sign-form' onSubmit={(e) => loginUser(e)}>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" />

                    <button className='button-login-sign'>Send Code</button>
                    <div className="login-sign-link">
                        Don't have an account? <Link to="/Signup">Sign Up</Link>
                    </div> 
                </form>
            </div>
                <div className="container-images">
                    <img src={herobackground}/>
                </div>
        </div>
    )
}

export default ForgotPassword;