import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
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

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,        
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}