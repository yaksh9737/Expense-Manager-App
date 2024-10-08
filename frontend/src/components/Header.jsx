// src/components/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlus,
  FaBook,
  FaBookReader,
} from "react-icons/fa";
import ThemedButton from "./ThemedButton"; // Reusable button component
import { toast } from "react-toastify"; // For notifications

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
  };

  return (
    <header className="bg-primary-bg text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6 ">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link
            to="/"
            className="text-title-gold hover:text-button-hover-bg transition duration-300"
          >
            Expense Tracker
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 ">
          {user ? (
            <>
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-hover-text transition duration-300 flex p-2 items-center"
                >
                  <FaBook className="inline mr-1" aria-hidden="true" /> My Expenses
                </Link>
              </li>
              <li>
                <Link
                  to="/add-expense"
                  className="text-white hover:text-hover-text transition duration-300 flex p-2 items-center"
                >
                  <FaPlus className="inline mr-1" aria-hidden="true" /> Add Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/statistics"
                  className="text-white hover:text-hover-text transition duration-300 flex p-2 items-center"
                >
                  <FaBookReader className="inline mr-1" aria-hidden="true" /> Statistics
                </Link>
              </li>
              <li>
                <ThemedButton onClick={handleLogout}>
                  <FaSignOutAlt className="inline mr-1" aria-hidden="true" /> Logout
                </ThemedButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:text-hover-text transition duration-300 flex items-center"
                >
                  <ThemedButton >
                  <FaSignInAlt className="inline mr-1" aria-hidden="true" /> Login
                </ThemedButton>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white hover:text-hover-text transition duration-300 flex items-center"
                >
                  <ThemedButton>
                  <FaUserPlus className="inline mr-1" aria-hidden="true" /> Register
                </ThemedButton>
                  
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
