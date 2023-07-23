// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthWrapper';
import { Wrapper, Input, LoginButton, ErrorMsg } from '../styles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const { setToken, setIsLoggedIn } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.access) {
                localStorage.setItem('refresh', data.refresh);
                localStorage.setItem('access', data.access);
                setToken(data.access);
                setIsLoggedIn(true);
                navigate('/dashboard');
            }
        } catch (error) {
            setLoginError(true);
            console.error('Error logging in: ', error);
        }
    };

    return (
        <Wrapper>
            <Input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
            />
            <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <LoginButton onClick={handleLogin}>Login</LoginButton>
            {loginError && <ErrorMsg>Error logging in. Please try again.</ErrorMsg>}
        </Wrapper>
    );
};

export default Login;
