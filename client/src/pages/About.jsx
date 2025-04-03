/* eslint-disable no-unused-vars */
import React from 'react'
import { BiWallet, BiBarChart, BiShield, BiMoney, BiPieChartAlt } from 'react-icons/bi'
import budget from '../assets/budget.jpg'
import graph from '../assets/graph.png'
import graph2 from '../assets/image-27.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function About() {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-6">

            {/* Header Section */}
            <div className="text-center max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    <BiWallet className="text-gray-700" /> Expense Tracker
                </h1>
                <p className="text-gray-600 text-base md:text-lg mt-3">
                    A smarter way to <span className="font-semibold">manage your finances</span>.
                    Track expenses, analyze spending patterns, and take control of your budget effortlessly.
                </p>
            </div>

            {/* Features Section */}
            <div className="mt-8 flex flex-col gap-8 md:gap-6">

                {/* Feature 1: Budget Planning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    <img src={budget} alt="Budget Planning" className="w-full max-w-[450px] max-h-[250px] rounded-lg shadow-md" />
                    <div className="text-left">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <BiPieChartAlt className="text-gray-700" /> Budget Planning
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            Set <span className="font-semibold">monthly budgets</span>, track spending, and get alerts when you&apos;re close to your limit.
                            Stay on top of expenses with full visibility over where your money is going.
                        </p>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            Whether it&apos;s groceries, bills, or leisure spending, categorize transactions and stay within financial goals.
                        </p>
                    </div>
                </div>

                {/* Feature 2: Smart Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    <div className="text-left">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <BiBarChart className="text-gray-700" /> Smart Analytics
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            Get <span className="font-semibold">detailed breakdowns</span> of where your money goes.
                            Identify spending patterns, cut unnecessary expenses, and improve financial habits.
                        </p>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            AI-driven analytics provide personalized recommendations to optimize finances and increase savings.
                        </p>
                    </div>
                    <img src={graph} alt="Analytics Graph" className="w-full max-w-[300px] md:max-w-[380px] max-h-[250px] rounded-lg shadow-md" />
                </div>

                {/* Feature 3: Secure & Private */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    <img src={graph2} alt="Security & Privacy" className="w-full max-w-[300px] md:max-w-[380px] max-h-[250px] rounded-lg shadow-md" />
                    <div className="text-left">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <BiShield className="text-gray-700" /> Secure & Private
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            Your <span className="font-semibold">data is encrypted</span> and never shared.
                            We prioritize security so you can track finances with peace of mind.
                        </p>
                        <p className="text-gray-600 text-sm md:text-base mt-1">
                            With advanced security measures, you have full control over financial information without compromising privacy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-6">
                {user ? (
                    <button className="bg-gray-800 text-white px-5 py-2 md:px-6 md:py-3 rounded-md transition duration-300 
                    hover:bg-gray-900 hover:scale-105 flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate('/dashboard')}>
                        <BiWallet className="text-lg" />
                        Dashboard
                    </button>
                ) : (
                    <button className="bg-gray-800 text-white px-5 py-2 md:px-6 md:py-3 rounded-md transition duration-300 
                    hover:bg-gray-900 hover:scale-105 flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate('/signin')}>
                        <BiWallet className="text-lg" />
                        Start Tracking Now
                    </button>
                )}
            </div>

        </div>
    )
}

export default About
