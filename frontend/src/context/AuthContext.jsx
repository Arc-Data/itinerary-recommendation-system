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
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/home')
        } else {
            alert("Something went wrong")
        }
    }

    const updateToken = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                'refresh':authTokens.refresh, 
            })
        })
        const data = await response.json()
        
        if(response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
 
        } else {
            logoutUser()

        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    const contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,    
        logoutUser: logoutUser,    
    }

    useEffect(() => {

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