/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill out all fields.');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                return setErrorMessage(data.message || "Something went wrong.");
            }

            setLoading(false);
            navigate('/signin');
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="flex flex-col justify-center items-center border border-gray-300 p-8 rounded-2xl shadow-2xl bg-white w-96 
                            transition-all duration-300 hover:shadow-3xl hover:border-gray-500">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Username</label>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Password</label>
                        <input type="password" name="password" placeholder="Password" onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100" />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
                    )}

                    <div className="flex flex-col items-center justify-center">
                        <button type="submit" disabled={loading}
                            className="bg-gray-800 mt-2 text-white p-2 w-[40%] rounded-md transition-all duration-300 
                                           hover:bg-gray-900 hover:scale-105 hover:opacity-90 cursor-pointer">
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>

                    <div className="text-center mt-1 text-gray-600">
                        Already have an account? 
                        <button 
                            onClick={() => navigate('/signin')} 
                            className="text-gray-700 font-semibold ml-1 cursor-pointer hover:underline">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
