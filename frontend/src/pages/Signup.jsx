import { useContext, useState } from "react"
import { Link, Navigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext"
/*Images*/
import herobackground from "/herobackground.jpeg";

const Signup = () => {
    const { registerUser, user } = useContext(AuthContext)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [formData, setFormData] = useState({
        'firstname': '',
        'lastname': '', 
        'email': '',
        'password': '',
        'confirm': '',
    })
    const [showPassword, setShowPassword] = useState(false)
    
    if(user) {
        return (user.is_staff ? <Navigate to="/admin" /> : <Navigate to="/home" />)
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if(name === 'confirm') {
            formData.password === value ? setPasswordMatch(true) : setPasswordMatch(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(passwordMatch) {
            await registerUser(formData)
            
        } else {
            console.log("Not match")
        }
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
            <h2>Sign Up</h2>
            <form className='modal-login-sign-form' onSubmit={handleSubmit}>
                <div className="name-inputs">
                    <div>
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            placeholder="Enter your first name" 
                            value={formData.firstname}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input 
                            type="text" 
                            name="lastname" 
                            placeholder="Enter your last name" 
                            value={formData.lastname}
                            onChange={handleInputChange} />
                    </div>
                </div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={handleInputChange} />
                <label>Password:</label>
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button
                        type="button"
                        className={`toggle-password-button ${showPassword ? 'visible' : ''}`}
                        onClick={togglePasswordVisibility}
                    >
                    {showPassword ? "👁️‍🗨️" : "👁"}
                    </button>
                </div>
                <label>
                Confirm Password:
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleInputChange} />
                    <button
                        type="button"
                        className={`toggle-password-button ${showPassword ? 'visible' : ''}`}
                        onClick={togglePasswordVisibility}>
                    {showPassword ? "👁️‍🗨️" : "👁"}
                    </button>
                </div>
                </label>
                <button className='button-login-sign' type="submit">Sign Up</button>
                  <div className="login-sign-link">
                     Already have an account? <Link to="/login">Login</Link>
                </div>
                </form>
            </div>
            <div className="container-images">
                <img src={herobackground}/>
            </div>
        </div>
    );
}

export default Signup;