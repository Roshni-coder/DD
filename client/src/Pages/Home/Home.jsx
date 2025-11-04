import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare } from "react-icons/fa";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/properties/list`);
        setProperties(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePropertyClick = (property) => {
    navigate(`/property/${property._id}`, { state: { property } });
  };

  return (
    <div className="mt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">
        Featured Properties
      </h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "Apartment", "Villa", "Penthouse"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-blue-800 border-blue-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white !rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer border border-gray-100"
            onClick={() => handlePropertyClick(property)}
          >
            <div className="relative">
              <img
                src={
                  property.images?.[0]
                    ? `${API_BASE_URL}${property.images[0]}`
                    : "https://via.placeholder.com/400"
                }
                alt={property.title}
                className="w-full !rounded-xl h-70 object-cover"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                {property.category?.name || "Featured"}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {property.title}
              </h3>
              <p className="flex items-center gap-2 text-gray-500 text-sm">
                <FaMapMarkerAlt className="text-red-500" /> {property.location}
              </p>
              <div className="flex gap-4 text-gray-600 text-sm mt-2">
                <span className="flex items-center gap-1">
                  <FaBed className="text-blue-800" /> {property.beds} Beds
                </span>
                <span className="flex items-center gap-1">
                  <FaBath className="text-blue-800" /> {property.baths} Baths
                </span>
                <span className="flex items-center gap-1">
                  <FaVectorSquare className="text-blue-800" />{" "}
                  {property.area?.size} sq ft
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-red-600 text-lg">
                  ₹{property.price?.toLocaleString()}
                </span>
                <button className="text-white bg-blue-800 px-4 py-2 rounded-full text-sm hover:bg-red-600 transition">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
