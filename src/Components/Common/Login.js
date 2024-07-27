import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:8000/api/send-otp/', { email });
            setOtpSent(true);
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/verify-otp/', { email, otp });
            const { role } = response.data; // Assuming the role is returned from the backend

            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else if (role === 'user') {
                navigate('/user-dashboard');
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                    <div>
                        <label>User Name</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <div>
                        <label>OTP:</label>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                        />
                    </div>
                    <button type="submit">Verify OTP</button>
                </form>
            )}
        </div>
    );
};

export default Login;
