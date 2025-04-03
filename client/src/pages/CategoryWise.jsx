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
import { useSelector } from "react-redux";

function CategoryWise() {
  const user = useSelector((state) => state.user.currentUser);
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
      // Refetch category totals after deleting
      fetchCategoryExpenses();
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

  if (user && user.payment) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 mt-10 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Category-Wise Expenses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Date Range Inputs */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleChange}
              className="border rounded p-2 w-full focus:ring-2 focus:ring-black focus:border-transparent"
              min={dateRange.startDate}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Category (Optional)</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-2 w-full focus:ring-2 focus:ring-black focus:border-transparent"
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
          className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Get Category Expenses"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Bar Chart for Category Totals */}
        {chartData.length > 0 && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fill: "#333" }} />
                <YAxis tick={{ fill: "#333" }} />
                <Tooltip cursor={{ fill: "rgba(136, 132, 216, 0.1)" }} />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Detailed Expenses */}
        {expenses.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Detailed Expenses</h3>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg">₹{expense.amount.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{expense.description}</p>
                      <div className="mt-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-4">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-500 hover:text-blue-700 p-1"
                        title="Edit expense"
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete expense"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 mt-10 shadow-md rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Premium Feature</h2>
        <p>This is a premium feature. Please make a payment to access it.</p>
        <button className="mt-4 bg-black text-white py-2 px-6 rounded hover:bg-gray-900 transition">
          Upgrade Now
        </button>
      </div>
    );
  }
}

export default CategoryWise;