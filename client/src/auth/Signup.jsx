import React, { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../api/authAPI";
export const Signup = () => {
  // Use state to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    age: ""
  });

  // Use state to handle errors or success messages
  const [message, setMessage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/v0/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          gender: formData.gender,
          age: formData.age,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User registered successfully!");
      } else {
        setMessage(data.msg || "Error registering user.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
        {message && (
          <p className="mb-4 text-center text-red-500">{message}</p>
        )}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              required
            />
          </div>
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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
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
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            required
          />
          <label
            className="text-sm mb-2 text-gray-200 cursor-pointer"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label
            className="text-sm mb-2 text-gray-200 cursor-pointer"
            htmlFor="age"
          >
            Age
          </label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
            id="age"
            type="date"
            required
          />
          <p className="text-white mt-4">
            Already have an account?
            <Link
              to="/login"
              className="text-sm text-blue-500 -200 hover:underline mt-4"
            >
              Login
            </Link>
          </p>

          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
