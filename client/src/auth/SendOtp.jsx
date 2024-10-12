import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/authAPI";
const SendOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // For success messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const BASE_URL = "http://localhost:9000"; // Adjust the URL to your backend

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Handle the Send OTP button click
  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v0/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending the email to backend
      });

      // If server response is not OK (e.g., 404 or 500)
      if (!response.ok) {
        const errorResponse = await response.text(); // Get the error message
        throw new Error(`Error: ${errorResponse}`);
      }

      const data = await response.json();
      setOtpSent(true); // OTP sent successfully
      setError(null);
      setSuccess("OTP has been sent to your email. Please check your inbox.");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${BASE_URL}/api/v0/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Sending the email and OTP to backend
      });

      if (!response.ok) {
        const errorResponse = await response.text(); // Get the error message
        throw new Error(`Error: ${errorResponse}`);
      }

      const data = await response.json();

      // Assuming the server sends a JWT token upon successful OTP verification
      localStorage.setItem("token", data.token); // Store the token

      // Navigate to the password reset page after successful OTP verification
      setSuccess("OTP verified successfully. Redirecting to change password...");
      setTimeout(() => {
        navigate("/changepassword"); // Redirect after 2 seconds
      }, 2000);
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Forget Password</h2>

        {!otpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 w-full"
            />
            <button
              onClick={handleSendOtp}
              disabled={loading || !email}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 w-full"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading || !otp}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default SendOtp;
