import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineCheckCircle,
  AiOutlineRocket,
  AiOutlineUser,
  AiOutlineSafetyCertificate,
  AiOutlineStar,
  AiOutlineFire
} from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare, FaShieldAlt, FaHome, FaUsers } from "react-icons/fa";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const properties = [
    { id:1, title:"Luxury 2BHK Apartment", category:"Apartment", price:"₹45 Lakh", location:"Whitefield, Bangalore", image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80", beds:2, baths:2, area:"1200 sq ft", featured:true },
    { id:2, title:"Modern 3BHK Villa", category:"Villa", price:"₹75 Lakh", location:"Bandra West, Mumbai", image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"1800 sq ft", featured:true },
    { id:3, title:"Premium Penthouse", category:"Penthouse", price:"₹1.2 Cr", location:"Koregaon Park, Pune", image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"2200 sq ft", featured:true },
    { id:4, title:"Cozy 1BHK Apartment", category:"Apartment", price:"₹35 Lakh", location:"Indiranagar, Bangalore", image:"https://images.unsplash.com/photo-1572120360610-d971b9c798b1?auto=format&fit=crop&w=600&q=80", beds:1, baths:1, area:"850 sq ft", featured:true },
    { id:5, title:"Luxury 4BHK Villa", category:"Villa", price:"₹1.5 Cr", location:"Juhu, Mumbai", image:"https://images.unsplash.com/photo-1600585154208-8f2c9a43e4e2?auto=format&fit=crop&w=600&q=80", beds:4, baths:4, area:"2500 sq ft", featured:true },
    { id:6, title:"Skyline Penthouse", category:"Penthouse", price:"₹2.1 Cr", location:"Baner, Pune", image:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80", beds:4, baths:4, area:"3000 sq ft", featured:true }
  ];

  const premiumProperties = [
    { id:7, title:"Luxury Studio Apartment", category:"Apartment", price:"₹28 Lakh", location:"Electronic City, Bangalore", image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80", beds:1, baths:1, area:"800 sq ft", tag:"Premium" },
    { id:8, title:"Spacious 4BHK Villa", category:"Villa", price:"₹95 Lakh", location:"Juhu, Mumbai", image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", beds:4, baths:3, area:"2400 sq ft", tag:"Luxury" },
    { id:9, title:"Modern 2BHK Flat", category:"Apartment", price:"₹35 Lakh", location:"Hinjewadi, Pune", image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80", beds:2, baths:2, area:"1100 sq ft", tag:"Featured" },
  ];

  const rentalProperties = [
    { id:10, title:"Furnished 2BHK for Rent", category:"Rental", price:"₹25,000/month", location:"Koramangala, Bangalore", image:"https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80", beds:2, baths:2, area:"950 sq ft", rating:"4.8" },
    { id:11, title:"Luxury 3BHK Serviced Apartment", category:"Rental", price:"₹65,000/month", location:"Andheri West, Mumbai", image:"https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"1400 sq ft", rating:"4.9" },
    { id:12, title:"Studio Apartment for Rent", category:"Rental", price:"₹18,000/month", location:"Kalyani Nagar, Pune", image:"https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=600&q=80", beds:1, baths:1, area:"600 sq ft", rating:"4.7" },
  ];

  const topSellingProperties = properties.slice(0, 3);

  const stats = [
    { number:"10,000+", label:"Properties Listed" },
    { number:"₹2,500Cr+", label:"Property Value" },
    { number:"98%", label:"Customer Satisfaction" },
    { number:"0%", label:"Brokerage Fee" }
  ];

  const features = [
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Verified Listings", description:"All properties are verified to ensure authenticity." },
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"No Brokerage", description:"Direct contact with owners saves you huge brokerage fees." },
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Easy Search", description:"Advanced filters and search options for quick results." }
  ];

  const trustFeatures = [
    { icon: <FaShieldAlt className="text-blue-600 text-4xl" />, title: "Verified Listings", description: "Every property undergoes 3-step verification process" },
    { icon: <AiOutlineSafetyCertificate className="text-red-600 text-4xl" />, title: "Transparent Pricing", description: "No hidden charges. See exactly what you pay for" },
    { icon: <FaHome className="text-blue-600 text-4xl" />, title: "Direct Owner Contact", description: "Talk directly to property owners, no middlemen" },
    { icon: <FaUsers className="text-red-600 text-4xl" />, title: "5000+ Happy Families", description: "Trusted by families across India since 2018" },
  ];

  const filteredProperties = properties.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePropertyClick = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-white flex flex-col justify-center items-center text-center space-y-6 px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600">
          Find Your Dream Home
        </h1>
        <p className="text-gray-600 text-lg">
          Search from verified listings & connect directly with property owners
        </p>

        <div className="bg-white shadow-lg rounded-full p-3 flex w-full max-w-3xl mt-4 border border-gray-200">
          <input
            type="text"
            placeholder="Search by city, locality, project..."
            className="flex-1 px-4 py-2 rounded-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-red-600 transition">
            <AiOutlineSearch /> Search
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow py-6 border border-blue-100">
              <div className="text-2xl md:text-3xl font-bold mb-1 text-red-600">{stat.number}</div>
              <div className="text-gray-500 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏡 Emotional Home Ad Section */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center px-6">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-red-700/80"></div>
        <div className="relative z-10 max-w-4xl space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Because Every Family Deserves<br />a Home Filled with Love
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Your journey to finding the perfect home starts here
          </p>
          <button className="bg-red-600 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Find My Home
          </button>
        </div>
      </section>

      {/* Featured Properties with Category Filter */}
      <section className="py-12 container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Featured Properties</h2>

        {/* 🏷️ Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["All", "Apartment", "Villa", "Penthouse"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold border transition ${
                selectedCategory === cat
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition cursor-pointer transform hover:-translate-y-2 duration-300 border border-gray-100"
              onClick={() => handlePropertyClick(property)}
            >
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-64 object-cover"/>
                {property.featured && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
                <button className="absolute top-3 right-3 text-white text-xl bg-black/20 rounded-full p-1">
                  <AiOutlineHeart />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-gray-800">{property.title}</h3>
                <p className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaMapMarkerAlt className="text-red-500" /> {property.location}
                </p>
                <div className="flex gap-4 text-gray-600 text-sm mt-2">
                  <span className="flex items-center gap-1"><FaBed className="text-blue-500" /> {property.beds} Beds</span>
                  <span className="flex items-center gap-1"><FaBath className="text-blue-500" /> {property.baths} Baths</span>
                  <span className="flex items-center gap-1"><FaVectorSquare className="text-blue-500" /> {property.area}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-red-600 text-lg">{property.price}</span>
                  <button className="text-white bg-blue-600 px-4 py-2 rounded-full text-sm hover:bg-red-600 transition">
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏆 Premium Properties Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🏆 Premium Properties
            </h2>
            <p className="text-gray-600 text-lg">
              Exclusive handpicked homes for discerning buyers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 cursor-pointer group border border-blue-100"
                onClick={() => handlePropertyClick(property)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {property.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-800">{property.title}</h3>
                  <p className="flex items-center gap-2 text-gray-500 mb-3">
                    <FaMapMarkerAlt className="text-red-500" /> {property.location}
                  </p>
                  <div className="flex gap-4 text-gray-600 text-sm mb-4">
                    <span className="flex items-center gap-1"><FaBed className="text-blue-500" /> {property.beds} Beds</span>
                    <span className="flex items-center gap-1"><FaBath className="text-blue-500" /> {property.baths} Baths</span>
                    <span className="flex items-center gap-1"><FaVectorSquare className="text-blue-500" /> {property.area}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-red-600 text-xl">{property.price}</span>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏙️ Most Selling & Rental Properties Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Top Selling Homes */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                  <AiOutlineFire className="text-red-500" /> Top-Selling Homes
                </h2>
                <p className="text-gray-600 mt-2">Properties with highest sales this month</p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSellingProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-red-100"
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      HOT SELLER
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" /> {property.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-red-600 text-xl">{property.price}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        ⭐ 4.8
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Rented Properties */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
                  <AiOutlineStar className="text-blue-500" /> Most Rented Properties
                </h2>
                <p className="text-gray-600 mt-2">Highly sought-after rental homes</p>
              </div>
              <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentalProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-blue-100 group"
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                      POPULAR RENTAL
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-500" /> {property.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600 text-xl">{property.price}</span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm flex items-center gap-1">
                        ⭐ {property.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ Why Deal Direct (Trusted by India) */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Millions Trust Deal Direct
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              India's most trusted real estate platform with transparent, verified, and broker-free property transactions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 border border-white border-opacity-20"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Why Choose DealDirect?</h2>
          <p className="text-center text-gray-600 mb-12">Experience real estate like never before with our unique advantages</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white px-6 py-6 rounded-xl shadow-lg text-center space-y-4 hover:shadow-xl transition border border-blue-100">
                <div className="flex justify-center text-4xl">{feature.icon}</div>
                <h3 className="font-semibold text-2xl text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;