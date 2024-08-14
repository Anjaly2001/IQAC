import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputOtp } from 'primereact/inputotp';
import Header from '../../Header';

const Login = () => {
    // State variables to manage email, OTP, whether the OTP has been sent, and any error messages
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');

    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    // Handler for email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handler for OTP input change
    const handleOtpChange = (e) => {
        setOtp(e.value);
    };

    // Function to send OTP to the user's email
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing error messages

        try {
            // Make a POST request to send the OTP to the provided email
            await axios.post('http://localhost:8000/api/authentication/login_with_email', { email });
            setOtpSent(true); // Update state to show OTP input field
        } catch (error) {
            // Handle error if OTP sending fails
            setError('Failed to send OTP. Please try again.');
        }
    };

    // Function to verify the OTP entered by the user
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing error messages

        try {
            // Make a POST request to verify the OTP and get the user role
            const response = await axios.post('http://localhost:8000/api/authentication/verify_otp', { email, otp });
            const { role } = response.data; // Assuming the role is returned from the backend

            // Navigate to the appropriate dashboard based on user role
            if (role === 'Admin') {
                navigate('/admin-dashboard');
            } else if (role === 'User') {
                navigate('/user-dashboard');
            } else {
                // Handle unexpected roles
                setError('Invalid role');
            }
        } catch (error) {
            // Handle error if OTP verification fails
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <>
            {/* Header component, consistent across pages */}
            <Header />
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    {/* Conditional rendering: Show email input if OTP is not yet sent */}
                    {!otpSent ? (
                        <form onSubmit={handleSendOtp}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
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
                            <button type="submit" className="btn btn-primary btn-block mt-3" style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }}>Request OTP</button>
                        </form>
                    ) : (
                        /* Show OTP input after sending OTP */
                        <form onSubmit={handleVerifyOtp}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
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
                            <div className="form-group">
                                <label htmlFor="otp">OTP</label>
                                <InputOtp
                                    value={otp}
                                    onChange={handleOtpChange}
                                    length={6} // Set the number of OTP input boxes to 6
                                    mask
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mt-3" style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }}>Verify OTP</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
