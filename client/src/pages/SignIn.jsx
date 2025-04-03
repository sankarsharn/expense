/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFailure, signoutSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';

function SignIn() {
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false); // Modal state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/auth/signout', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) {
                return dispatch(signInFailure(data.message));
            }
            dispatch(signoutSuccess());
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        console.log("User deleted");
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
              method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
              dispatch(deleteUserFailure(data.message));
            } else {
              dispatch(deleteUserSuccess(data));
            }
          } catch (error) {
            dispatch(deleteUserFailure(error.message));
          } // Replace with actual delete API call
        setShowModal(false);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="flex flex-col justify-center items-center border border-gray-300 p-6 rounded-2xl shadow-2xl bg-white w-full max-w-96
                            transition-all duration-300 hover:shadow-3xl hover:border-gray-500">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <button
                            type="submit"
                            className="bg-gray-800 mt-2 text-white p-2 w-[40%] rounded-md transition-all duration-300 
                                           hover:bg-gray-900 hover:scale-105 hover:opacity-90 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="text-center mt-1 text-gray-600">
                        Don&apos;t have an account?
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-gray-700 font-semibold ml-1 cursor-pointer hover:underline"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>

            {/* Delete & Sign Out Buttons */}
            <div className="flex justify-between w-full max-w-96 mt-3">
                <button className="text-gray-700 font-semibold hover:underline cursor-pointer"
                    onClick={() => setShowModal(true)}> 
                    Delete
                </button>

                <button className="text-gray-700 font-semibold hover:underline cursor-pointer" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
                        <p className="text-gray-600 mt-2">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignIn;
