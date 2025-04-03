import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser); // Check if user is signed in

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-white to-gray-50 text-black py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link
            to="/"
            className="text-6xl font-bold font-[Pacifico] hover:scale-105 transition-transform duration-300 text-center md:text-left"
          >
            Track It Up
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden text-black focus:outline-none ml-4"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12h16"
                className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"
                  }`}
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex space-x-6 text-lg items-center">
            {["/", "/about", "/contact"].map((path) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`px-5 py-2 rounded-md transition-all duration-300 text-base relative group ${location.pathname === path
                    ? "bg-gray-200 font-semibold"
                    : "hover:text-gray-600"
                    }`}
                >
                  {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            {user && (
                <li>
                  <Link
                    to="/dashboard"
                    className={`px-5 py-2 rounded-md transition-all duration-300 text-base relative group ${location.pathname === "/dashboard"
                        ? "bg-gray-200 font-semibold"
                        : "hover:text-gray-600"
                      }`}
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
            )}

            { user && !user.payment && (
              <li>
              <Link
                to="/payment"
                className={`px-5 py-2 rounded-md transition-all duration-300 text-base relative group ${location.pathname === "/payment"
                    ? "bg-gray-200 font-semibold"
                    : "hover:text-gray-600"
                  }`}
              >
                Payment
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            )

            }

          </ul>

          <Link
            to={user ? "/signin" : "/signup"}
            className="px-5 py-2 bg-black text-white rounded-md transition-all duration-300 hover:bg-gray-800 hover:scale-105 text-base relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            {user ? "Sign Out" : "Sign Up"}
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`absolute top-16 mt-8 left-0 w-full px-4 ${isMenuOpen ? "block" : "hidden"
            } md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out z-50`}
        >
          <ul className="flex flex-col space-y-4 text-lg items-center py-4">
            {["/", "/about", "/contact"].map((path) => (
              <li key={path} className="w-full text-center">
                <Link
                  to={path}
                  className={`px-5 py-2 w-full block rounded-md text-base transition-all duration-300 ${location.pathname === path
                    ? "bg-gray-200 font-semibold"
                    : "hover:text-gray-600"
                    }`}
                  onClick={toggleMenu}
                >
                  {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}

            {user && (
              <li className="w-full text-center">
                <Link
                  to="/dashboard"
                  className={`px-5 py-2 w-full block rounded-md text-base transition-all duration-300 ${location.pathname === "/dashboard"
                    ? "bg-gray-200 font-semibold"
                    : "hover:text-gray-600"
                    }`}
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}

            <li className="w-full text-center">
              <Link
                to={user ? "/logout" : "/signup"}
                className="px-5 py-2 w-full block bg-black text-white rounded-md transition-all duration-300 hover:bg-gray-800 hover:scale-105 text-base"
                onClick={toggleMenu}
              >
                {user ? "Sign Out" : "Sign Up"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
