import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'email':e.target.email.value, 
                'password':e.target.password.value
            })
        })
        const data = await response.json()
         
        if(response.status === 200) {
            const userData = jwt_decode(data.access)
            setAuthTokens(data)
            setUser(userData)
            localStorage.setItem('authTokens', JSON.stringify(data))
            
            if(userData.is_staff) {
                navigate('/admin')
            } else {
                navigate('/home')
            }
        } else {
            alert("Something went wrong")
        }
    }

    const registerUser = async (formData) => {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'first_name': formData.firstname,
                'last_name': formData.lastname,
                'email': formData.email,
                'password': formData.password
            })
        })

        if(response.status === 201) {
            const data = await response.json()
            alert("Successfully created user")
            loginUser({ target: { email: { value: formData.email }, password: {value: formData.password} }, preventDefault: () => {} });

        } else if(response.status === 401) {
            console.log("401")
        } else {
            
        }

        return false;
    }

    const updateToken = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'refresh':authTokens?.refresh, 
            })
        })
        const data = await response.json()
        
        if(response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
 
        } else {
            console.log("Supposedly logs out the user")
            logoutUser()
        }

        if(loading) {
            setLoading(false)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    const userSetPreference = () => {
        if (user) {
            setUser(prevUser => ({
                ...prevUser,
                set_preferences: true
            }))
        }
    }

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,    
        logoutUser: logoutUser,    
        registerUser: registerUser,
        userSetPreference: userSetPreference,
    }

    useEffect(() => {
        
        if(loading) {
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, fourMinutes)

        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}