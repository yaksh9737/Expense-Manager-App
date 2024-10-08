const Expense = require("../models/expenseModel");
const csv = require("csv-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

// Add a single expense
const addExpense = async (req, res) => {
  const { amount, description, category, paymentMethod, date } = req.body;

  if (!amount || !description || !category || !paymentMethod || !date) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const expense = await Expense.create({
      amount,
      description,
      category,
      paymentMethod,
      date,
      user: req.user._id,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Failed to create expense", error });
  }
};

// Bulk add expenses via CSV
const bulkAddExpenses = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file" });
  }

  const expenses = [];
  const filePath = req.file.path; // Use the path directly from multer

  // Check if file exists before processing
  if (!fs.existsSync(filePath)) {
    return res.status(400).json({ message: "File not found" });
  }

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      expenses.push({
        amount: row.amount,
        description: row.description,
        category: row.category,
        paymentMethod: row.paymentMethod,
        date: new Date(row.date),
        user: req.user._id,
      });
    })
    .on("end", async () => {
      try {
        await Expense.insertMany(expenses);
        fs.unlinkSync(filePath); // Remove CSV file after processing
        res.status(201).json({ message: "Expenses added successfully" });
      } catch (error) {
        res.status(400).json({ message: "Failed to bulk add expenses", error });
      }
    })
    .on("error", (error) => {
      console.error("Error reading file:", error);
      res.status(500).json({ message: "Error processing file", error });
    });
};

// Get all expenses with filtering, sorting, and pagination
const getExpenses = async (req, res) => {
  const {
    category,
    dateFrom,
    dateTo,
    paymentMethod,
    sort,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = { user: req.user._id };

  if (category) filter.category = category;
  if (paymentMethod) filter.paymentMethod = paymentMethod;
  if (dateFrom && dateTo) {
    filter.date = { $gte: new Date(dateFrom), $lte: new Date(dateTo) };
  }

  try {
    const expenses = await Expense.find(filter)
      .sort(sort || "-date")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments(filter);
    res.status(200).json({
      expenses,
      totalExpenses,
      currentPage: page,
      totalPages: Math.ceil(totalExpenses / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses", error });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Failed to update expense", error });
  }
};

// Delete single or bulk expenses
const deleteExpenses = async (req, res) => {
  let { ids } = req.body;

  // If `ids` is not an array, convert it to an array to handle single deletion
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  // Check if `ids` is provided and contains valid MongoDB ObjectIds
  if (
    ids.length === 0 ||
    !ids.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return res
      .status(400)
      .json({ message: "Please provide valid expense IDs" });
  }

  try {
    // Delete expenses where _id is in the provided ids and the user matches
    const result = await Expense.deleteMany({
      _id: { $in: ids },
      user: req.user._id,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found with the provided IDs" });
    }

    res.status(200).json({ message: "Expenses deleted successfully" });
  } catch (error) {
    console.error("Error deleting expenses:", error);
    res.status(500).json({ message: "Failed to delete expenses", error });
  }
};

module.exports = {
  addExpense,
  bulkAddExpenses,
  getExpenses,
  updateExpense,
  deleteExpenses,
};
