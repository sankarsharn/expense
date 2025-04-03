import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // For social icons

const Footer = () => {
  const location = useLocation(); // Get the current route

  return (
    <footer className="bg-gradient-to-r from-white to-gray-50 text-black py-6 shadow-md mt-auto">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Contact
          </Link>
          {/* Conditional Link for Sign Up/Sign In */}
          {location.pathname === "/signup" ? (
            <Link
              to="/signin"
              className="hover:text-gray-600 transition-colors duration-300"
            >
              Sign In
            </Link>
          ) : (
            <Link
              to="/signup"
              className="hover:text-gray-600 transition-colors duration-300"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/sankarsharn-rastogi-117544217/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/12SHIVANSH-SINGH"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>

        {/* All Rights Reserved with Home Link */}
        <div className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="hover:text-gray-600 transition-colors duration-300"
          >
            Track It Up
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;