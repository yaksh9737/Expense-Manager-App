// src/pages/Register.js
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { FaUserPlus } from "react-icons/fa"; // Optional: Icon for visual appeal

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Use context login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await registerUser(formData); // Register user through API
      login(userData); // Update context with user data
      navigate("/"); // Redirect after registration
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-primary-bg">
      <div className="bg-modal-bg p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-title-gold flex items-center justify-center">
          <FaUserPlus className="mr-2" /> Register
        </h1>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="w-full p-3 border border-button-border rounded-md bg-transparent text-white placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-button-hover-bg"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full p-3 border border-button-border rounded-md bg-transparent text-white placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-button-hover-bg"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full p-3 border border-button-border rounded-md bg-transparent text-white placeholder-[#CCCCCC] focus:outline-none focus:ring-2 focus:ring-button-hover-bg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full border border-button-border text-white py-2 rounded-md font-semibold hover:bg-button-hover-bg hover:text-primary-bg transition duration-300 flex items-center justify-center"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-title-gold hover:text-button-hover-bg transition duration-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
