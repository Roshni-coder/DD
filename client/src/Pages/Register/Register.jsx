import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data submitted:", formData);
    alert("Account created successfully!");
  };

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Section */}
        <div className="md:w-1/2 bg-blue-900 text-white px-10 py-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-red-600">deal</span>
            <span className="text-blue-700">direct</span>
          </h1>
          <p className="text-lg">
            Create your account to start exploring broker-free properties!
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 py-10 px-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            />
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

            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="mr-2 accent-red-500"
              />
              I agree to the{" "}
              <span className="text-red-500 hover:underline cursor-pointer mx-1">
                Terms of Use
              </span>
              & 
              <span className="text-blue-500 hover:underline cursor-pointer">
                &nbsp; Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
