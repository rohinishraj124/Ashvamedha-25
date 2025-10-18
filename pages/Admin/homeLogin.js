import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { server, sportList } from '../../constant';
import { useLogin } from '../../context/loginContextProvider';
import Navbar from '../../components/navbar';
import apiClient from '../../lib/axios'; // Adjust path if necessary

function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // State for handling error messages
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();
    const loginCtx = useLogin();

    const handleAdminChange = (e) => {
        setError(''); // Clear error on new input
        setAdmin(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Use apiClient and the correct relative path
            const res = await apiClient.post(`/admin/login`, { // Changed URL
                email: admin.email.toLowerCase(),
                password: admin.password
            }, { withCredentials: true }); // Keep withCredentials if needed for cookies
            // Inside pages/Admin/homeLogin.js -> handleSubmit function

            // ... (inside the try block)
            if (res.data.statusCode === 200) {
                alert("Logged In Successfully!!");
                loginCtx.login(res.data.result.accessToken, res.data.result.refreshToken, res.data.result.sport);
                router.push("/Admin/home"); // <-- CORRECTED PATH
            } else {
                setError(res.data.message || "Invalid Credentials!!");
            }
            // ... (rest of the function)
        } catch (err) {
            setError(err.response?.data?.message || "An unexpected error occurred.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Reusable classes for inputs, replicating the SCSS mixin
    const baseInputClasses = "w-full rounded-md border-2 border-input-border bg-input-bg p-2.5 text-white transition-colors duration-300 focus:border-warm-hover focus:outline-none hover:border-warm-hover";

    return (
        <div className="min-h-screen bg-[#1c1c1c]">
            <Navbar />
            <div className='flex min-h-[80vh] items-center justify-center p-4'>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md rounded-lg bg-[#1c1c1c] p-5 shadow-lg shadow-black/50 md:p-8 lg:w-1/2 xl:w-1/3"
                >
                    <h2 className="mb-6 text-center text-3xl font-bold text-warm-secondary">
                        Admin Login
                    </h2>

                    {error && <p className="mb-4 rounded-md bg-red-900/50 p-3 text-center text-red-300">{error}</p>}

                    <div className="mb-4">
                        <label htmlFor="email" className="mb-1 block font-bold text-warm-secondary">
                            Sport (Email)
                        </label>
                        <select
                            required
                            name='email'
                            value={admin.email}
                            onChange={handleAdminChange}
                            className={baseInputClasses}
                        >
                            <option value="">Select sport</option>
                            {sportList.map((sport) => (
                                <option key={sport.name} value={sport.email}>
                                    {sport.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="mb-1 block font-bold text-warm-secondary">
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete='current-password'
                            name="password"
                            value={admin.password}
                            required
                            onChange={handleAdminChange}
                            className={baseInputClasses}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-warm p-2.5 font-bold text-white transition-colors duration-300 hover:bg-warm-hover disabled:cursor-not-allowed disabled:bg-gray-600"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;