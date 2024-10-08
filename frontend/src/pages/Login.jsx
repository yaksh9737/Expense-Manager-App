// src/pages/Login.js
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/api";
import { FaSignInAlt } from "react-icons/fa"; // Optional: Icon for visual appeal

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(formData); // Login through API
      login(userData); // Update context with user data
      navigate("/"); // Redirect to home after successful login
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-primary-bg">
      <div className="bg-modal-bg p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-title-gold flex items-center justify-center">
          <FaSignInAlt className="mr-2" /> Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Login
          </button>
        </form>

        {/* Link to Register */}
        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-title-gold hover:text-button-hover-bg transition duration-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
