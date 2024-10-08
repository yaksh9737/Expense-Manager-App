// src/components/ThemedButton.jsx
import React from "react";

const ThemedButton = ({ onClick, children, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border border-button-border text-white text-center px-4 py-2 rounded transition duration-300 flex items-center hover:bg-button-hover-bg hover:text-primary-bg ${className}`}
    >
      {children}
    </button>
  );
};

export default ThemedButton;
