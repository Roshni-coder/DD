// src/Components/HeroSection/HeroSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMapMarkerAlt, FaMicrophone } from "react-icons/fa";
import { tabConfig } from "./filterConfig";
import BudgetFilter from "./BudgetFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import PossessionFilter from "./PossessionFilter";
import FurnishingFilter from "./FurnishingFilter";
import AgentForFilter from "./AgentForFilter";
import CommercialPropertyTypeFilter from "./CommercialPropertyTypeFilter";
import TransactionTypeFilter from "./TransactionTypeFilter";
import PostedByFilter from "./PostedByFilter";
import ProjectPropertyTypeFilter from "./ProjectPropertyTypeFilter";
import AvailableForFilter from "./AvailableForFilter";

const HeroSection = ({ filters, setFilters, categories, subcategories }) => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Animated text rotation state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const animatedWords = ["Site Visits", "Interiors", "Property Management", "Transactions", "Financing", "Documentation"];
  
  // Budget state
  const [minBudget, setMinBudget] = useState(null);
  const [maxBudget, setMaxBudget] = useState(null);
  
  // All filter states
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([]);
  const [selectedFurnishingStatus, setSelectedFurnishingStatus] = useState([]);
  const [selectedAgentFor, setSelectedAgentFor] = useState([]);
  const [selectedCommercialPropertyTypes, setSelectedCommercialPropertyTypes] = useState([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedProjectPropertyTypes, setSelectedProjectPropertyTypes] = useState([]);
  const [selectedAvailableFor, setSelectedAvailableFor] = useState([]);

  const dropdownRefs = {
    budget: useRef(null),
    propertyType: useRef(null),
    possession: useRef(null),
    furnishing: useRef(null),
    agentFor: useRef(null),
    commercialPropertyType: useRef(null),
    transactionType: useRef(null),
    postedBy: useRef(null),
    projectPropertyType: useRef(null),
    availableFor: useRef(null)
  };

  // Animated text rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs[openDropdown]?.current && 
          !dropdownRefs[openDropdown].current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const currentConfig = tabConfig[activeTab];
  const tabs = ["Buy", "Rental", "Projects", "PG / Hostels", "Plot & Land", "Commercial", "Agents"];

  const renderFilters = () => {
    return currentConfig.filters.map((filterType) => {
      switch(filterType) {
        case 'budget':
          return (
            <BudgetFilter
              key="budget"
              minBudget={minBudget}
              setMinBudget={setMinBudget}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.budget}
            />
          );

        case 'propertyType':
          return (
            <PropertyTypeFilter
              key="propertyType"
              selectedPropertyTypes={selectedPropertyTypes}
              setSelectedPropertyTypes={setSelectedPropertyTypes}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.propertyType}
            />
          );

        case 'possession':
          return (
            <PossessionFilter
              key="possession"
              selectedPossessionStatus={selectedPossessionStatus}
              setSelectedPossessionStatus={setSelectedPossessionStatus}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.possession}
            />
          );

        case 'furnishing':
          return (
            <FurnishingFilter
              key="furnishing"
              selectedFurnishingStatus={selectedFurnishingStatus}
              setSelectedFurnishingStatus={setSelectedFurnishingStatus}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.furnishing}
            />
          );

        case 'agentFor':
          return (
            <AgentForFilter
              key="agentFor"
              selectedAgentFor={selectedAgentFor}
              setSelectedAgentFor={setSelectedAgentFor}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.agentFor}
            />
          );

        case 'commercialPropertyType':
          return (
            <CommercialPropertyTypeFilter
              key="commercialPropertyType"
              selectedCommercialPropertyTypes={selectedCommercialPropertyTypes}
              setSelectedCommercialPropertyTypes={setSelectedCommercialPropertyTypes}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.commercialPropertyType}
            />
          );

        case 'transactionType':
          return (
            <TransactionTypeFilter
              key="transactionType"
              selectedTransactionTypes={selectedTransactionTypes}
              setSelectedTransactionTypes={setSelectedTransactionTypes}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.transactionType}
            />
          );

        case 'postedBy':
          return (
            <PostedByFilter
              key="postedBy"
              selectedPostedBy={selectedPostedBy}
              setSelectedPostedBy={setSelectedPostedBy}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.postedBy}
            />
          );

        case 'projectPropertyType':
          return (
            <ProjectPropertyTypeFilter
              key="projectPropertyType"
              selectedProjectPropertyTypes={selectedProjectPropertyTypes}
              setSelectedProjectPropertyTypes={setSelectedProjectPropertyTypes}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.projectPropertyType}
            />
          );

        case 'availableFor':
          return (
            <AvailableForFilter
              key="availableFor"
              selectedAvailableFor={selectedAvailableFor}
              setSelectedAvailableFor={setSelectedAvailableFor}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              dropdownRef={dropdownRefs.availableFor}
            />
          );

        default:
          return null;
      }
    });
  };

  return (
    <section className="pt-20 relative min-h-[70vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 py-12">
      {/* Light-toned Modern Building/Architecture Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')",
          filter: "brightness(1.1) contrast(0.9)"
        }}
      ></div>
      
      {/* Light Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-blue-50/65 to-slate-50/75"></div>
      
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 400 400\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"2\" /%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" /%3E%3C/svg%3E')"
      }}></div>
      
      <div className="relative z-10 flex flex-col items-center space-y-5 max-w-7xl w-full">
        {/* Extra padding above Mumbai badge */}
        <div className="pt-8"></div>

        {/* City Badge - Compact */}
        <div className="text-xs font-medium text-gray-700 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-md border border-gray-200 flex items-center gap-1.5">
          <FaMapMarkerAlt className="text-red-500 text-xs" />
          <span>Mumbai</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl leading-tight">
          Your Dream Home Awaits in Mumbai
        </h1>

        {/* Animated Subtext - Compact */}
        <div className="text-sm sm:text-base text-gray-700 max-w-3xl">
          <p className="flex items-center justify-center flex-wrap">
            <span>We've got you covered! From finding the perfect property to&nbsp;</span>
            <span className="relative inline-block min-w-[180px] h-6">
              {animatedWords.map((word, index) => (
                <span
                  key={index}
                  className={`absolute left-0 font-bold text-blue-600 transition-all duration-700 ease-in-out ${
                    index === currentWordIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {word}
                </span>
              ))}
            </span>
          </p>
        </div>

        {/* Category Tabs - Compact */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-6">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl font-semibold text-xs sm:text-sm border-2 transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg transform scale-105"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm"
              }`}
            >
              <span className="text-sm">
                {tab === "Buy" && "🏠"}
                {tab === "Rental" && "🔑"}
                {tab === "Projects" && "🏢"}
                {tab === "PG / Hostels" && "🏘"}
                {tab === "Plot & Land" && "🌳"}
                {tab === "Commercial" && "🏬"}
                {tab === "Agents" && "👥"}
              </span>
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Search Box Container - Compact */}
        <div className="bg-white/98 backdrop-blur-md shadow-2xl rounded-3xl p-5 sm:p-7 w-full max-w-6xl border border-gray-200">
          {/* City Dropdown + Search Bar - Compact */}
          <div className="flex flex-col sm:flex-row gap-2.5 mb-3.5">
            <div className="relative">
              <select className="appearance-none w-full sm:w-44 bg-white rounded-xl px-3.5 py-2.5 pr-9 text-sm text-gray-700 font-semibold focus:ring-2 focus:ring-blue-400 outline-none border border-gray-300 cursor-pointer shadow-sm">
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex-1 relative flex items-center bg-white rounded-xl border border-gray-300 shadow-sm">
              <AiOutlineSearch className="absolute left-3.5 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder={currentConfig.searchPlaceholder}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-11 pr-20 py-2.5 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <div className="absolute right-2.5 flex items-center gap-1.5">
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <FaMapMarkerAlt className="text-blue-500 text-sm" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                  <FaMicrophone className="text-blue-500 text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Filter Dropdowns */}
          <div className="flex flex-wrap gap-2.5 items-center">
            {renderFilters()}

            {/* Search Button - Compact */}
            <button className="ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg transform hover:scale-105">
              <AiOutlineSearch className="text-base" />
              Search
            </button>
          </div>
        </div>

        {/* Quick Stats - Compact */}
        <div className="flex flex-wrap justify-center gap-5 mt-6 text-xs sm:text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-bold text-base sm:text-lg">25K+</span>
            <span>Properties in Mumbai</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold text-base sm:text-lg">0%</span>
            <span>Brokerage Fee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-600 font-bold text-base sm:text-lg">5000+</span>
            <span>Verified Owners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
