import React, { useContext, useEffect, useState } from "react";
import { fetchExpenses, updateExpense, deleteExpenses } from "../api/api";
import { AuthContext } from "../context/AuthContext";
// import ReactPaginate from "react-paginate";
import CustomCheckbox from "../components/CustomCheckbox"; // Import the CustomCheckbox component


const MyExpenses = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getExpenses();
  }, [page]);

  const getExpenses = async () => {
    try {
      const response = await fetchExpenses({
        page: page + 1, // Adjust to match backend's 1-based page index
        limit: itemsPerPage,
      });

      if (response.expenses.length === 0 && page > 0) {
        setPage(0); // Reset to first page if no data on the current page
      } else {
        setExpenses(response.expenses);
        const totalItems = response.totalExpenses || 0;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // const handlePageChange = ({ selected }) => {
  //   setPage(selected);
  // };

  const handleEditClick = (expense) => {
    setEditExpenseId(expense._id);
    setEditedData({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      date: expense.date,
    });
  };

  const handleSaveClick = async (id) => {
    try {
      await updateExpense(id, editedData);
      getExpenses();
      setEditExpenseId(null);
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (expenseId) => {
    setSelectedExpenses((prevSelected) => {
      if (prevSelected.includes(expenseId)) {
        return prevSelected.filter((id) => id !== expenseId);
      } else {
        return [...prevSelected, expenseId];
      }
    });
  };

  const handleBulkDelete = async () => {
    if (selectedExpenses.length === 0) {
      alert("Please select at least one expense to delete.");
      return;
    }

    try {
      await deleteExpenses(selectedExpenses);
      setSelectedExpenses([]);
      getExpenses();
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };

  const handleSingleDelete = async (expenseId) => {
    try {
      await deleteExpenses([expenseId]);
      getExpenses();
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const startDateMatch =
      !filter.startDate || new Date(expense.date) >= new Date(filter.startDate);
    const endDateMatch =
      !filter.endDate || new Date(expense.date) <= new Date(filter.endDate);
    const categoryMatch =
      !filter.category ||
      expense.category.toLowerCase().includes(filter.category.toLowerCase());
    const paymentMethodMatch =
      !filter.paymentMethod ||
      expense.paymentMethod
        .toLowerCase()
        .includes(filter.paymentMethod.toLowerCase());
    const searchMatch =
      !searchQuery ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      startDateMatch &&
      endDateMatch &&
      categoryMatch &&
      paymentMethodMatch &&
      searchMatch
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // const handleDeleteSelected = () => {
  //   // Logic to delete selected expenses
  //   // Example: filter out selected expenses from your state
  //   const newExpenses = expenses.filter(expense => !selectedExpenses.includes(expense._id));
  //   setExpenses(newExpenses);
  //   setSelectedExpenses([]); // Clear the selected expenses
  // };


  return (
    <div className="container mx-auto p-8 bg-[#ffffff] m-10 shadow-lg" style={{ borderRadius: '20px' }}>
      <h1 className="text-4xl font-bold mb-6 text-center text-title-gold">
        My Expenses
      </h1>

      {/* Search and Filters */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Search by description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-semibold">Filter by Category</label>
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            value={filter.category}
            onChange={handleFilterChange}
            className="border-2 border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block mb-1 font-semibold">Filter by Payment Method</label>
          <input
            type="text"
            name="paymentMethod"
            id="paymentMethod"
            placeholder="Payment Method"
            value={filter.paymentMethod}
            onChange={handleFilterChange}
            className="border-2 border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block mb-1 font-semibold">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={filter.startDate}
            onChange={handleFilterChange}
            className="border-2 border-gray-300 p-3 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block mb-1 font-semibold">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={filter.endDate}
            onChange={handleFilterChange}
            className="border-2 border-gray-300 p-3 rounded-md w-full"
          />
        </div>
      </div>

      {/* Expenses Table */}
      <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="px-6 py-4 text-sm font-medium">Select</th>
            <th className="px-6 py-4 text-sm font-medium">Description</th>
            <th className="px-6 py-4 text-sm font-medium">Amount</th>
            <th className="px-6 py-4 text-sm font-medium">Category</th>
            <th className="px-6 py-4 text-sm font-medium">Date</th>
            <th className="px-6 py-4 text-sm font-medium">Payment Method</th>
            <th className="px-6 py-4 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr
              key={expense._id}
              className="border-b hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              <td className="px-6 py-4">
                <CustomCheckbox
                  checked={selectedExpenses.includes(expense._id)}
                  onChange={() => handleCheckboxChange(expense._id)}
                />
              </td>
              <td className="px-6 py-4">
                {editExpenseId === expense._id ? (
                  <input
                    type="text"
                    name="description"
                    value={editedData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td className="px-6 py-4">
                {editExpenseId === expense._id ? (
                  <input
                    type="number"
                    name="amount"
                    value={editedData.amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  `$${expense.amount}`
                )}
              </td>
              <td className="px-6 py-4">
                {editExpenseId === expense._id ? (
                  <input
                    type="text"
                    name="category"
                    value={editedData.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                    className="border p-2 rounded-md w-full"
                  />
                ) : (
                  expense.category
                )}
              </td>
              <td className="px-6 py-4">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{expense.paymentMethod}</td>
              <td className="px-6 py-4 flex space-x-2">
                {editExpenseId === expense._id ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                      onClick={() => handleSaveClick(expense._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                      onClick={() => setEditExpenseId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                      onClick={() => handleEditClick(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                      onClick={() => handleSingleDelete(expense._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <button
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 m-5 ${selectedExpenses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={handleBulkDelete} // Function to handle delete action
        disabled={selectedExpenses.length === 0} // Disable button if no entries are selected
      >
        Delete Selected
      </button>


      {/* Pagination */}
      {/* <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"flex justify-center mt-4"}
        pageClassName={"mx-1"}
        previousClassName={"mx-1"}
        nextClassName={"mx-1"}
        activeClassName={"bg-blue-500 text-white"}
        pageLinkClassName={"border rounded-md px-3 py-1"}
        previousLinkClassName={"border rounded-md px-3 py-1"}
        nextLinkClassName={"border rounded-md px-3 py-1"}
      /> */}
    </div>
  );
};

export default MyExpenses;
