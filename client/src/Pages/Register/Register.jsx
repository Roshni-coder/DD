import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("Please agree to the Terms and Privacy Policy");
      return;
    }

    try {
      const res = await axios.post("http://localhost:9000/api/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully!");
      console.log("Registered user:", res.data);
      navigate("/login"); // redirect after success
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] mt-20 flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl transition-all duration-300">
        
        {/* Left Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#0056B8] to-[#ED1C24] text-white px-8 py-12 flex flex-col justify-center items-center text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">deal</span>
            <span className="text-yellow-200">direct</span>
          </h1>
          <p className="text-lg leading-relaxed max-w-md opacity-90">
            Create your account to start exploring <br /> broker-free properties and deals!
          </p>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 py-10 px-6 sm:px-10 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400"
            />
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

            <label className="flex items-start text-sm text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="mr-2 accent-red-500 mt-1"
              />
              <span>
                I agree to the{" "}
                <span className="text-red-500 hover:underline cursor-pointer">
                  Terms of Use
                </span>{" "}
                &{" "}
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="bg-gradient-to-r from-red-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
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
