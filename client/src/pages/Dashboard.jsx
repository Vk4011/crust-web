import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/authAPI"; // Ensure BASE_URL is correctly defined

const Dashboard = () => {
  const [user, setUser] = useState(null); // To store user data
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, redirect to login
      navigate("/login");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in Authorization header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Failed to fetch profile.");
        }

        const data = await response.json();
        setUser(data); // Set the user data
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message || "Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-3xl mb-4">Welcome, {user.firstName}!</h1>
      <p className="mb-2">Email: {user.email}</p>
      <p className="mb-2">Phone Number: {user.phoneNumber}</p>
      <p className="mb-2">Gender: {user.gender}</p>
      <p className="mb-2">Age: {user.age}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default Dashboard;
