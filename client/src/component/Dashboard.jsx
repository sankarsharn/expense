import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="flex flex-col items-center mt-20 justify-center  text-black px-6">
      <h1 className="text-4xl font-bold mb-6">Track It Up!!</h1>

      {user ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-3">Welcome, {user.username}!</h2>
          <p className="text-lg text-gray-700">Start tracking your expenses today.</p>

          <div className="mt-4">
            <Link
              to="/entry"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
            >
              Make an entry
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-3">You are not signed in</h2>
          <p className="text-lg text-gray-700">Please log in to access the dashboard.</p>
          
          <div className="mt-4">
            <Link
              to="/signup"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
            >
              Sign Up / Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
