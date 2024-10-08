import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyExpenses from "./pages/MyExpenses";
import AddExpense from "./pages/AddExpense";
import ExpenseStatistics from "./pages/ExpenseStatistics"; // Import ExpenseStatistics page
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MyExpenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <ExpenseStatistics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </AuthProvider>
  );
}

export default App;
