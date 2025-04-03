/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const mottoText = "Track all your expenses at once";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentLoop = loopNum % mottoText.length;
      const fullText = mottoText;

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-50 flex flex-col justify-center items-start px-8 md:px-16 lg:px-32">
      {/* Motto with Typing Effect */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-black">
        <span>{displayText}</span>
        <span className="ml-2 animate-blink">|</span>
      </h1>

      {/* Objective */}
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        Take control of your finances, one expense at a time! Track, analyze, and
        optimize your spending effortlessly—because smart money habits start
        today.
      </p>

      {/* Join Us Button */}
      <Link
        to="/signup"
        className="px-8 py-3 bg-black text-white rounded-md text-lg font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-300"
      >
        Join Us
      </Link>

      {/* Additional Enhancements */}
      <div className="mt-12">
        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Expense Tracking</h2>
            <p className="text-gray-600">
              Easily track all your expenses in one place and gain insights into
              your spending habits.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Budget Management</h2>
            <p className="text-gray-600">
              Set budgets, monitor progress, and stay on top of your financial
              goals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Smart Analytics</h2>
            <p className="text-gray-600">
              Get detailed reports and analytics to make informed financial
              decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;