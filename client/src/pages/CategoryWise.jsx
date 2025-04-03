import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function CategoryWise() {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [category, setCategory] = useState("");
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/form/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  }

  async function fetchCategoryExpenses() {
    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    if (dateRange.startDate > dateRange.endDate) {
      setError("Start date cannot be after end date.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/form/categoryWiseExpenseTotal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...dateRange, category }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const { categoryTotals, detailedExpenses } = await res.json();
      setCategoryTotals(categoryTotals);
      setExpenses(detailedExpenses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(expenseId) {
    try {
      const res = await fetch(`/api/form/delete/${expenseId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete expense");
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error(error);
      setError("Could not delete expense.");
    }
  }

  function handleEdit(expense) {
    console.log("Editing:", expense);
    // Implement edit functionality here
  }

  // Transform categoryTotals for the bar chart
  const chartData = categoryTotals.map((cat) => ({
    name: cat._id,
    total: cat.totalAmount,
  }));

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-10 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Category-Wise Expenses</h2>

      {/* Date Range Inputs */}
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={dateRange.startDate}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={dateRange.endDate}
            onChange={handleChange}
            className="border rounded p-2"
            min={dateRange.startDate}
          />
        </div>
      </div>

      {/* Category Selection */}
      <div className="mt-4">
        <label className="text-sm font-medium">Category (Optional)</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          {categories.map((cat) =>
            cat !== "Food" && cat !== "Transport" ? (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ) : null
          )}
        </select>
      </div>

      {/* Fetch Button */}
      <button
        onClick={fetchCategoryExpenses}
        className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Category Expenses"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Bar Chart for Category Totals */}
      {chartData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Detailed Expenses */}
      {expenses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Detailed Expenses:</h3>
          <ul className="mt-2 space-y-3">
            {expenses.map((expense) => (
              <li
                key={expense._id}
                className="p-4 border rounded-lg bg-gray-50 shadow-md flex justify-between items-center"
              >
                <div>
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">₹{expense.amount}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1">{expense.description}</p>
                  <p className="text-sm text-gray-600">
                    Category:{" "}
                    <span className="font-semibold">{expense.category}</span>
                  </p>
                </div>
                {/* Icons for Edit and Delete */}
                <div className="flex gap-3">
                  <AiOutlineEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    size={20}
                    onClick={() => handleEdit(expense)}
                  />
                  <AiOutlineDelete
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    size={20}
                    onClick={() => handleDelete(expense._id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryWise;
