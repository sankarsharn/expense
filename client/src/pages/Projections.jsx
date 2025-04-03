import React from "react";
import { Link } from "react-router-dom";
import Dashsidebar from "../component/Dashsidebar";

function Projections() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Dashsidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-black mb-8">Projections</h1>

        {/* Interactive Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Block 1: Expense History */}
          <Link
            to="/expenseHistory"
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-black mb-4">
              View Expense History
            </h2>
            <p className="text-lg text-gray-700">
              Analyze past spending and trends
            </p>
          </Link>

          {/* Block 2: Category-wise Breakdown */}
          <Link
            to="/categoryWise"
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-black mb-4">
              Category-wise Breakdown
            </h2>
            <p className="text-lg text-gray-700">
              Visualize expenses by category
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Projections;