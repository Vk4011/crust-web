import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "../api/authAPI"; // Ensure BASE_URL is correctly defined

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For managing login/logout state
  const [userName, setUserName] = useState(""); // For storing user's name
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    // Check if the user is logged in (by checking if a token exists)
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      // Fetch user profile data to get the user's name
      const fetchUserName = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/v1/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Include token in Authorization header
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.firstName); // Assuming the API returns user's first name
          } else {
            // If token is invalid or expired, remove it
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setUserName("");
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
          // Handle error (e.g., token invalid, network error)
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUserName("");
        }
      };

      fetchUserName();
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  }, []);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from localStorage
    setIsAuthenticated(false); // Update the state to reflect the user is logged out
    setUserName("");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-slate-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">CRUST Corporation</Link>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-200">
            Home
          </Link>
          <Link to="/services" className="text-gray-300 hover:text-white transition duration-200">
            Services
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition duration-200">
            About
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-white transition duration-200">
            Contact
          </Link>
          <Link to="/form" className="text-gray-300 hover:text-white transition duration-200">
            Form
          </Link>
          {/* Conditionally render 'Data' link when authenticated */}
          {isAuthenticated && (
            <Link to="/data" className="text-gray-300 hover:text-white transition duration-200">
              Data
            </Link>
          )}
          {/* Conditionally render user's name linking to dashboard */}
          {isAuthenticated && userName && (
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-200">
              {userName}
            </Link>
          )}
        </div>

        {/* CTA Button for Desktop */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {/* Hamburger Icon */}
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-slate-900 text-center overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/services" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/about" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/contact" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
              Contact
            </Link>
            <Link to="/form" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
              Form
            </Link>
            {/* Conditionally render 'Data' link when authenticated */}
            {isAuthenticated && (
              <Link to="/data" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
                Data
              </Link>
            )}
            {/* Conditionally render user's name linking to dashboard */}
            {isAuthenticated && userName && (
              <Link to="/dashboard" className="block text-gray-300 py-2 hover:text-white transition duration-200" onClick={toggleMenu}>
                {userName}
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); toggleMenu(); }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 mt-4 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-4 rounded-lg"
                  onClick={toggleMenu}
                >
                  Login
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
