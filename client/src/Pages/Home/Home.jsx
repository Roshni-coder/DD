import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineStar,
  AiOutlineDollarCircle,
} from "react-icons/ai";
import {  FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import HeroSection from "../../Components/HeroSection/HeroSection";
import DiscoverSection from "../../Components/DiscoverSection/DiscoverSection"; 
import TopDevelopers from "../../Components/TopDevelopers/TopDevelopers";
import TopLocalities from "../../Components/TopLocalities/TopLocalities";

const API_BASE = import.meta.env.VITE_API_BASE;

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

    useEffect(() => {
    (async () => {
      try {
        const [propRes] = await Promise.all([
          axios.get(`${API_BASE}/api/properties/property-list`),
        ]);
        setProperties(propRes.data.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    })();
  }, []);


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

    return (
      matchSearch &&
      matchCategory &&
      matchSubcategory &&
      matchCity &&
      matchState
    );
  });

  const handleViewDetails = (property) => {
    navigate(`/properties/${property._id}`, { state: { property } });
  };

  // Major Indian Cities Data
  const majorCities = [
    { name: "Mumbai", properties: "25K+", image: "https://images.unsplash.com/photo-1560215986-02b1c78af74a?auto=format&fit=crop&w=400&q=80" },
    { name: "Delhi", properties: "22K+", image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=400&q=80" },
    { name: "Bengaluru", properties: "18K+", image: "https://images.unsplash.com/photo-1529209065735-c1a5e2cbea1f?auto=format&fit=crop&w=400&q=80" },
    { name: "Hyderabad", properties: "15K+", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80" },
    { name: "Chennai", properties: "12K+", image: "https://images.unsplash.com/photo-1595079676339-153e7ea56a93?auto=format&fit=crop&w=400&q=80" },
    { name: "Kolkata", properties: "10K+", image: "https://images.unsplash.com/photo-1582573613351-495bdfa3d96e?auto=format&fit=crop&w=400&q=80" },
    { name: "Pune", properties: "14K+", image: "https://images.unsplash.com/photo-1597040663342-45b6af3e0917?auto=format&fit=crop&w=400&q=80" },
    { name: "Ahmedabad", properties: "8K+", image: "https://images.unsplash.com/photo-1633152617887-e10dbd5027d3?auto=format&fit=crop&w=400&q=80" },
  ];

  const allCities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Patna", "Indore", "Thane",
    "Bhopal", "Visakhapatnam", "Vadodara", "Firozabad", "Ludhiana", "Rajkot", "Agra",
    "Siliguri", "Nashik", "Faridabad", "Patiala", "Meerut", "Kalyan", "Vasai", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi",
    "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai",
    "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli", "Dharwad"
  ];

  const featuredDevelopers = [
    { name: "DLF", projects: "150+", logo: "🏢" },
    { name: "Sobha", projects: "120+", logo: "🏛" },
    { name: "Prestige", projects: "180+", logo: "🏬" },
    { name: "Godrej", projects: "90+", logo: "🏣" },
    { name: "Brigade", projects: "110+", logo: "🏤" },
    { name: "Lodha", projects: "130+", logo: "🏨" },
  ];

  const propertyTypes = [
    { type: "Apartments", count: "45K+", icon: "🏢" },
    { type: "Villas", count: "12K+", icon: "🏡" },
    { type: "Plots", count: "8K+", icon: "📐" },
    { type: "Commercial", count: "15K+", icon: "🏬" },
    { type: "Farm Houses", count: "3K+", icon: "🌾" },
    { type: "PG/Hostels", count: "5K+", icon: "🏘" },
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "₹2,500Cr+", label: "Property Value" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "0%", label: "Brokerage Fee" },
  ];

  return (
    <div className="font-sans text-gray-800">
      
      {/* 🏠 Hero Section Component */}
      <HeroSection
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        subcategories={subcategories}
      />
        
        
      {/* 🏙 Featured Properties */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Featured Properties
          </h2>
          {filteredProperties.length === 0 ? (
            <p className="text-gray-500">No properties found.</p>
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
                    <h2 className="text-lg font-semibold truncate">
                      {property.title}
                    </h2>
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
      </section>
      {/* 🏘 Discover Section Component */}
      <DiscoverSection />
      <TopLocalities />
      <TopDevelopers />


      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-red-600 py-4 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏙 Featured Cities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Explore Properties Across India
            </h2>
            <p className="text-gray-600 text-lg">Discover your dream home in top cities</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
            {majorCities.map((city, index) => (
              <div key={index} className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={city.image} alt={city.name} className="w-full h-32 object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{city.name}</h3>
                  <p className="text-sm opacity-90">{city.properties} Properties</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
              50+ Cities Across India
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allCities.map((city, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-red-50 border border-gray-200"
                >
                  <FaMapMarkerAlt className="text-red-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-700">{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Developers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by Every Indian
          </h2>
          <p className="text-gray-600 mb-10">Partnered with 100+ renowned real estate brands</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredDevelopers.map((dev, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:scale-105">
                <div className="text-3xl mb-3">{dev.logo}</div>
                <h3 className="font-bold text-gray-800 mb-1">{dev.name}</h3>
                <p className="text-sm text-gray-600">{dev.projects} Projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏘 Property Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find Your Perfect Property Type
          </h2>
          <p className="text-gray-600 mb-10">Explore diverse property categories tailored to your needs</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition transform hover:scale-105 border"
              >
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{type.type}</h3>
                <p className="text-sm text-gray-600">{type.count} Listings</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎉 Mega Advertisement */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-red-800 text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <FaBuilding className="text-5xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 2M+ satisfied customers who found their perfect property on DealDirect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
              Browse Properties
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2">
              <AiOutlineDollarCircle /> Get Home Loan
            </button>
          </div>
        </div>
      </section>

      {/* 📈 Investment Banner */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-6 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white">
          <AiOutlineStar className="text-4xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Smart Investment Opportunity</h3>
          <p className="text-lg mb-6 opacity-90">Properties in top cities appreciating 15–20% annually</p>
          <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            View High ROI Properties →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
