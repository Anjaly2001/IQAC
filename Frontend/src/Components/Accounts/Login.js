import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Header';
import { InputOtp } from 'primereact/inputotp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (value) => {
        setOtp(value);
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post('http://localhost:8000/api/authentication/login_with_email', { email });
            setOtpSent(true);
            toast.success('OTP sent to your email!'); // Display success toast
        } catch (error) {
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/authentication/verify_otp', { email, otp });
            const { access_token, refresh_token } = response.data.data;
            const { role } = response.data;

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user_role', role);

            if (role === 'admin') {
                navigate('/dashboard');
            } else if (role === 'staffs') {
                navigate('/user-dashboard');
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            if (error.response && error.response.data.error === 'OTP expired.') {
                setError('Your OTP has expired. Please request a new OTP.');
                setOtpSent(false);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        }
    };

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                                    onChange={(e) => handleOtpChange(e.value)}
                                    numInputs={6}
                                    length={6}
                                    inputClassName="form-control otp-input"
                                    separator={<span>-</span>}
                                    autoFocus
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
