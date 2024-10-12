import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection after login
import { Link } from "react-router-dom";
import BASE_URL from "../api/authAPI"; // Assuming BASE_URL is defined in your authAPI

const Login = () => {
  // Use state to store email, password, and any error/success messages
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null); // To store error messages
  const navigate = useNavigate(); // For navigation after login

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/v0/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend returns a token upon successful login
        localStorage.setItem("token", data.token); // Store token in localStorage or sessionStorage

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setMessage(data.msg || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Login</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            required
          />
          <p className="text-white mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sm text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>

          <p className="text-white mt-2">
            Forgot your password?{" "}
            <Link to="/send-otp" className="text-sm text-blue-500 hover:underline">
              Click here
            </Link>
          </p>

          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
