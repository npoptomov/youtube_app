// AuthWrapper.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh');
        let accessToken = localStorage.getItem('access');
        let isAccessTokenExpired = true;

        if (accessToken) {
            const decoded = jwt_decode(accessToken);
            const currentTime = Date.now() / 1000;
            if (decoded.exp > currentTime) {
                isAccessTokenExpired = false;
            }
        }

        if (!refreshToken || isAccessTokenExpired) {
            fetch('/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to refresh token');
                    }
                    return res.json();
                })
                .then((data) => {
                    accessToken = data.access;
                    localStorage.setItem('access', data.access);
                    setToken(accessToken);  // update the token state
                    setIsLoggedIn(true);  // update the isLoggedIn state
                    navigate(location.pathname !== '/' ? location.pathname : '/dashboard'); // <-- Navigate to current page if not '/', else to dashboard
                })
                .catch(() => {
                    setIsLoggedIn(false);
                    navigate('/');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setToken(accessToken);  // update the token state
            setIsLoggedIn(true);  // update the isLoggedIn state
            navigate(location.pathname !== '/' ? location.pathname : '/dashboard'); // <-- Navigate to current page if not '/', else to dashboard
            setIsLoading(false);
        }
    }, [navigate, location.pathname]); 

    const value = {
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
    };

    if (isLoading) {
        return null;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthWrapper;
