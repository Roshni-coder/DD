import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/users/login`, formData);

      toast.success("Login successful!");
      console.log("Logged in user:", res.data);

      // Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // redirect to homepage
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] mt-10 flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl">
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0056B8] to-[#ED1C24] text-white px-8 py-12 flex flex-col justify-center items-center text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">deal</span>
            <span className="text-yellow-200">direct</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-md opacity-90">
            Welcome back! Log in to explore <br /> verified, broker-free
            properties.
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 py-10 px-6 sm:px-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
