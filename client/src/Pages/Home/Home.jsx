import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineSearch,
  AiOutlineCheckCircle,
  AiOutlineSafetyCertificate,
} from "react-icons/ai";
import { FaShieldAlt, FaHome, FaUsers } from "react-icons/fa";

const API_BASE = "http://localhost:9000";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subcategory: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  // 🏡 Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/properties/list`);
        setProperties(res.data.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // 🗂️ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/categories/list`);
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🧩 Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!filters.category) {
        setSubcategories([]);
        return;
      }
      try {
        const res = await axios.get(
          `${API_BASE}/api/subcategories/byCategory/${filters.category}`
        );
        setSubcategories(res.data || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, [filters.category]);

  // 🔍 Filtered properties (client-side)
  const filteredProperties = properties.filter((p) => {
    const title = (p.title || "").toLowerCase();
    const city = (p.address?.city || "").toLowerCase();
    const state = (p.address?.state || "").toLowerCase();
    const q = filters.search.toLowerCase();

    const matchSearch =
      !q || title.includes(q) || city.includes(q) || state.includes(q);
    const matchCategory =
      !filters.category || p.category?._id === filters.category;
    const matchSubcategory =
      !filters.subcategory || p.subcategory?._id === filters.subcategory;
    const matchCity =
      !filters.city || city.includes(filters.city.toLowerCase());
    const matchState =
      !filters.state || state.includes(filters.state.toLowerCase());

    return matchSearch && matchCategory && matchSubcategory && matchCity && matchState;
  });

  const handleViewDetails = (property) => {
    navigate(`/properties/${property._id}`, { state: { property } });
  };

  // Stats and features
  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "₹2,500Cr+", label: "Property Value" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "0%", label: "Brokerage Fee" },
  ];

  const trustFeatures = [
    {
      icon: <FaShieldAlt className="text-blue-600 text-4xl" />,
      title: "Verified Listings",
      description: "Every property undergoes a 3-step verification process.",
    },
    {
      icon: <AiOutlineSafetyCertificate className="text-red-600 text-4xl" />,
      title: "Transparent Pricing",
      description: "No hidden charges. See exactly what you pay for.",
    },
    {
      icon: <FaHome className="text-blue-600 text-4xl" />,
      title: "Direct Owner Contact",
      description: "Talk directly to property owners — no middlemen.",
    },
    {
      icon: <FaUsers className="text-red-600 text-4xl" />,
      title: "5000+ Happy Families",
      description: "Trusted by families across India since 2018.",
    },
  ];

  const features = [
    {
      icon: <AiOutlineCheckCircle className="text-red-600 text-3xl" />,
      title: "Verified Listings",
      description: "All properties are verified to ensure authenticity.",
    },
    {
      icon: <AiOutlineCheckCircle className="text-red-600 text-3xl" />,
      title: "No Brokerage",
      description: "Direct contact with owners saves you fees.",
    },
    {
      icon: <AiOutlineCheckCircle className="text-red-600 text-3xl" />,
      title: "Easy Search",
      description: "Advanced filters for quick and easy results.",
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* 🏠 Hero Section with Dynamic Search */}
      <section className="mt-20 relative h-[75vh] flex flex-col justify-center items-center text-center bg-gray-50 px-6">
        <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/white-wall.png')] opacity-20"></div>

        <div className="relative z-10 flex flex-col items-center space-y-5 max-w-6xl w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-red-600">
            Welcome to <span className="text-blue-900">DealDirect</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Search from verified listings & connect directly with property owners.
          </p>

          {/* 🔍 Dynamic Search Filters */}
          <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-5xl border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              

              {/* Category */}
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value, subcategory: "" })
                }
                className="border bg-red-600 rounded-full px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Subcategory */}
              <select
                value={filters.subcategory}
                onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
                disabled={!filters.category}
                className="border bg-red-600 rounded-full px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none"
              >
                <option value="">All Subcategories</option>
                {subcategories.map((sc) => (
                  <option key={sc._id} value={sc._id}>
                    {sc.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="City"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="border bg-red-600 rounded-full px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none"
              />
              <input
                type="text"
                placeholder="State"
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="border bg-red-600 rounded-full px-4 py-3 text-white focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
<div className="flex">
  <input
                type="text"
                placeholder="Search by keyword or title"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="border w-full rounded-lg px-4  text-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
              />
              <button className="mt-6  bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2">
              <AiOutlineSearch /> Search 
            </button>
</div>
            
          </div>
        </div>
      </section>

      {/* 🏘️ Property Grid */}
      <div className="max-w-7xl mx-auto mt-16 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🏘️ Available Properties
        </h1>

        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-500">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img
                  src={`${API_BASE}${property.images?.[0] || ""}`}
                  alt={property.title}
                  className="h-60 w-full object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-semibold truncate">{property.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {property.address?.city}, {property.address?.state}
                  </p>
                  <p className="text-red-600 font-bold text-lg mb-3">
                    ₹{property.price?.toLocaleString()} {property.priceUnit}
                  </p>
                  <button
                    onClick={() => handleViewDetails(property)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🌆 Banner Section */}
      <section className="relative h-[400px] mt-16 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-red-700/80"></div>
        <div className="relative z-10 max-w-4xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Because Every Family Deserves a Home Filled with Love
          </h2>
          <p className="text-lg opacity-90">
            Your journey to finding the perfect home starts here.
          </p>
          <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105">
            Explore Now
          </button>
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow py-6 border border-blue-100"
            >
              <div className="text-2xl font-bold mb-1 text-red-600">
                {stat.number}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛡️ Why DealDirect */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Millions Trust DealDirect</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              India's most trusted real estate platform for verified, transparent, and broker-free deals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-20 transition transform hover:scale-105 border border-white border-opacity-20"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-200 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌟 Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Why Choose DealDirect?
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Experience real estate like never before with our unique advantages
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-white px-6 py-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition border border-blue-100"
              >
                <div className="flex justify-center text-4xl">{f.icon}</div>
                <h3 className="font-semibold text-xl mt-3 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
