import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data submitted:", formData);
    alert("Login successful!");
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Section */}
        <div className="md:w-1/2 bg-blue-900 text-white px-10  py-20 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-red-600">deal</span>
            <span className="text-blue-700">direct</span>
          </h1>
          <p className="text-lg">
            Welcome back! Access your account to explore broker-free properties.
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 py-20 px-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
