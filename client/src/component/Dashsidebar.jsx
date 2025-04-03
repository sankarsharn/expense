import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Dashsidebar = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Sidebar for larger screens */}
            <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-white to-gray-50 shadow-lg h-screen sticky top-0 z-40">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-black mb-8">Track It Up</h2>
                    <ul className="space-y-4">
                        {[
                            { path: "/entry", name: "Entry" },
                            { path: "/chatbot", name: "Chatbot" },
                            { path: "/projections", name: "Projections" },
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-md text-base transition-all duration-300 ${location.pathname === item.path
                                            ? "bg-gray-200 font-semibold"
                                            : "hover:bg-gray-100 hover:text-gray-600"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar Button (below navbar) */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-20 left-4 bg-black text-white p-2 rounded-md z-50"
                aria-label="Toggle Sidebar"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-white to-gray-50 shadow-lg z-40 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:hidden`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-black mb-8">Track It Up</h2>
                    <ul className="space-y-4">
                        {[
                            { path: "/entry", name: "Entry" },
                            { path: "/chatbot", name: "Chatbot" },
                            { path: "/projections", name: "Projections" },
                        ].map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-md text-base transition-all duration-300 ${location.pathname === item.path
                                            ? "bg-gray-200 font-semibold"
                                            : "hover:bg-gray-100 hover:text-gray-600"
                                        }`}
                                    onClick={toggleSidebar}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Dashsidebar;
