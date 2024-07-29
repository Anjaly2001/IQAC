import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {!otpSent ? (
                    <form onSubmit={handleSendOtp}>
                        <div className="form-group">
                            <label htmlFor="email">User Name</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Send OTP</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="form-group">
                            <label htmlFor="otp">OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                id="otp"
                                name="otp"
                                value={otp}
                                onChange={handleOtpChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Verify OTP</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
