import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputOtp } from 'primereact/inputotp';
import Header from '../../Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, verify_otp } from '../../axios/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false); // New state for processing message

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
        setProcessing(false); // Reset processing state if necessary

        try {
            const data = { email };
            const response = await login(data);
            console.log(response);
            setOtpSent(true);
            toast.success('OTP sent to your email!');

            // Show "Processing..." after OTP sent
            setTimeout(() => {
                setProcessing(true);
                // Show "Please wait for a few minutes..." after "Processing..."
                setTimeout(() => {
                    setProcessing(false);
                    toast.info('Please wait for a few minutes...');
                }, 2000); // Adjust the delay time as needed
            }, 1000); // Delay before showing "Processing..."
        } catch (error) {
            console.log(error);
            setError('Failed to send OTP. Please try again.');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await verify_otp({ email, otp });
            const { access_token, refresh_token } = response.data;
            const { role } = response;

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
                        <>
                            {processing && <div className="alert alert-info text-center">Processing...</div>}
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
