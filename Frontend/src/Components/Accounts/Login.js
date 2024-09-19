import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputOtp } from "primereact/inputotp";
import Header from "../../Header";
import { toast } from "react-toastify";
import { login, verify_otp } from "../../axios/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false); // State to handle processing message
  const domain = "@christuniversity.in"; // Fixed domain
  const [fieldValue, setFieldValue] = useState('');
  const [fieldError, setFieldError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateField(value);
    // setEmail(e.target.value);
  };

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const validateField = (email) => {
    const allowedPattern = /^[a-zA-Z0-9\s]+$/;
  
    if (!allowedPattern.test(email)) {
      setFieldError("Field should contain only alphanumeric characters and spaces. Special characters like '@', '()', etc., are not allowed.");
    } else {
      setFieldError(""); // Clear the error if valid
    }
  };
  


  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setProcessing(true); // Show processing message

    try {

      const fullEmail = email + domain;
      const data = { email: fullEmail };
      const response = await login(data);
      console.log(response);

      if (response["type"] === "success") {
        setTimeout(() => {
          setProcessing(false); // Hide processing message
          setOtpSent(true);
          toast.success(response["message"]); // Display success toast
        }, 2000); // 2 seconds delay
      } else {
        setTimeout(() => {
          setProcessing(false);
          toast.error(response["message"]); // Display success toast
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      console.log(error);
      setProcessing(false); // Hide processing message
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const fullEmail = email + domain;
      console.log(email);
      const data = { email: fullEmail, otp };
      const response = await verify_otp(data);
      console.log(response);

      const role = response["role"];
      const { departments } = response; // Assuming the API response has these fields
      localStorage.setItem("user_departments", JSON.stringify(departments)); // Assuming departments is an array

      localStorage.setItem("access_token", response["token"]["access"]);
      localStorage.setItem("refresh_token", response["token"]["refresh"]);
      localStorage.setItem("user_role", response["role"]);
      localStorage.setItem("username", response["user"]);

      window.dispatchEvent(new Event("storage"));

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.error === "OTP expired.") {
        setError("Your OTP has expired. Please request a new OTP.");
        setOtpSent(false);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Show processing message while OTP is being sent */}
          {processing && (
            <div className="alert alert-info text-center">Processing...</div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="mb-1"
                  style={{ fontSize: "14px" }}
                >
                  Email
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className={`form-control ${fieldError ? 'is-invalid' : ''}`} 
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    placeholder="Enter your email username"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" style={{ backgroundColor: "#e9ecef" }}>
                      {domain}
                    </span>
                  </div>
                  {fieldError && <div className="invalid-feedback">{fieldError}</div>} {/* Display validation error */}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3"
                style={{ backgroundColor: "#1e3a8a", borderColor: "#1e3a8a" }}
              >
                Request OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="mb-1"
                  style={{ fontSize: "14px" }}
                >
                  Email
                </label>
                <div className="single-input">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={`${email}${domain}`}
                    disabled
                  />
                </div>
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
              <button
                type="submit"
                className="btn btn-primary btn-block mt-3"
                style={{ backgroundColor: "#1e3a8a", borderColor: "#1e3a8a" }}
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
