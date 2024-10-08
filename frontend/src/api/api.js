import axios from "axios";

// Set your backend API base URL
const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend API URL

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Fetch expenses with pagination
export const fetchExpenses = async ({ page, limit }) => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

// Add expense with token authentication
export const addExpense = async (expense) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/expenses`, expense, {
    headers: {
      Authorization: `Bearer ${token}`, // Set token in headers
    },
  });
  return response.data;
};

// Bulk add expenses via CSV
export const bulkAddExpenses = async (formData) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/expenses/bulk`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Set token in headers
      "Content-Type": "multipart/form-data", // For file uploads
    },
  });
  return response.data;
};

// Update an expense
export const updateExpense = async (id, updatedExpense) => {
  const token = getToken();
  const response = await axios.patch(
    `${API_BASE_URL}/expenses/${id}`,
    updatedExpense,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Set token in headers
      },
    }
  );
  return response.data;
};
// Function to delete one or more expenses
export const deleteExpenses = async (ids) => {
  const token = getToken();
  const response = await axios.delete(`${API_BASE_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { ids }, // Pass the array of IDs in the request body
  });
  return response.data;
};

// Login user and receive the token
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
  return response.data;
};

// Register user and receive the token
export const registerUser = async (credentials) => {
  const response = await axios.post(
    `${API_BASE_URL}/users/register`,
    credentials
  );
  return response.data;
};
