import { useState } from "react"

const Signup = () => {
    const [formData, setFormData] = useState({
        'firstname': '',
        'lastname': '', 
        'email': '',
        'password': '',
        'confirm': '',
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
        <div>
            <h2 className='modal-login-sign-text'>Sign Up</h2>
            <form className='modal-login-sign-form' onSubmit={handleSubmit}>
                <div className="name-inputs">
                    <div className="name-firstName">
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            name="firstname" 
                            placeholder="Enter your first name" 
                            value={formData.firstname}
                            onChange={handleInputChange} />
                    </div>
                    <div className="name-lastName">
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
                <div className="password-input">
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
                <div className="password-input">
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
                </form>
            {/* <div className="login-sign-link">
            Already have an account? <Link to="/login">Login</Link>
            </div> */}
        </div>
    );
}

export default Signup;