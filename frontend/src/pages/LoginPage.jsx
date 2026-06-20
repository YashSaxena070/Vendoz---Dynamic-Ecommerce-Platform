import React, { useEffect } from 'react'
import Login from '../components/Login/Login'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
    const { isSeller } = useSelector((state) => state.seller);
    // if user is login then redirect to home page
    // if seller is login then redirect to dashboard page
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (isSeller) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, isSeller, navigate]);
    return (
        <div>
            <Login />
        </div>
    )
}

export default LoginPage