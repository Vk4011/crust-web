import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/authAPI";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const BASE_URL = "http://localhost:9000"; // Adjust the URL to your backend

  // Handle password change
  const handlePasswordChange = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please verify OTP first.");
      setLoading(false);
      return;
    }

    console.log("Retrieved Token:", token); // Log the token for debugging

    try {
      const response = await fetch(`${BASE_URL}/api/v0/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Ensure token is correctly passed
        },
        body: JSON.stringify({ password }), // Send the new password to the backend
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.msg || "Error changing password.");
      }

      setSuccess("Password changed successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login"); // Redirect to login after password change
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Set New Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 w-full"
        />
        <button
          onClick={handlePasswordChange}
          disabled={loading || !password || !confirmPassword}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          {loading ? "Changing Password..." : "Change Password"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </div>
  );
};

export default NewPassword;
