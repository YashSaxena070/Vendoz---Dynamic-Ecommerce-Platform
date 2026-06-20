import React, { useEffect } from 'react'
import Signup from '../components/Signup/Signup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignupPage = () => {

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
            <Signup />
        </div>
    )
}

export default SignupPage