import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { 
  HeartIcon, 
  ShareIcon, 
  MapPinIcon, 
  HomeIcon,
  CameraIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  CalendarIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { 
  HeartIcon as HeartIconSolid,
  CheckBadgeIcon 
} from "@heroicons/react/24/solid";

// Circular Progress Chart Component
const CircularChart = ({ percentage, label, value, color = "red" }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    red: "text-red-500 stroke-red-500",
    blue: "text-blue-500 stroke-blue-500",
    green: "text-green-500 stroke-green-500",
    yellow: "text-yellow-500 stroke-yellow-500"
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-out ${colorClasses[color]}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          <span className="text-xs text-gray-500 mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
};

// Loan Summary Card Component
const LoanSummaryCard = ({ icon: Icon, title, value, subtitle, color = "red" }) => {
  const colorClasses = {
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

const PropertyDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const property = state?.property || {
    id: 1,
    title: "Luxury 3 BHK Apartment in Koramangala",
    location: "Koramangala, Bangalore",
    buyPrice: 12500000,
    bhk: 3,
    bathrooms: 2,
    furnishing: "Fully Furnished",
    parking: "2 Covered",
    minDownPayment: 500000,
    interestRate: 8.5,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    description: "This stunning 3 BHK apartment offers modern living with premium amenities. Located in the heart of Koramangala, it provides easy access to tech parks, educational institutions, and entertainment hubs.",
    amenities: ["Swimming Pool", "Gym", "Park", "Security", "Power Backup", "Club House", "Children's Play Area", "Jogging Track"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e"
    ],
    details: {
      area: "1800 sq.ft.",
      age: "3 years",
      floor: "5th (Total 8 floors)",
      facing: "North-East",
      availability: "Immediate"
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500 text-xl">Property not found</p>
      </div>
    );
  }

  // 🟢 WhatsApp number placeholder
  const whatsappNumber = "919876543210";
  const message = `Hi, I'm interested in the property "${property.title}" located at ${property.location}. Could you please share more details?`;
  const mapURL = `https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`;

  // 🏘 Suggested properties
  const suggestedProperties = [
    {
      id: 2,
      title: "3 BHK Villa in Bangalore",
      location: "Whitefield, Bangalore",
      price: "₹1.25 Cr",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      bhk: 3
    },
    {
      id: 3,
      title: "2 BHK Apartment in Mumbai",
      location: "Andheri, Mumbai",
      price: "₹85 Lakh",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      bhk: 2
    },
    {
      id: 4,
      title: "Luxury 4 BHK Penthouse in Pune",
      location: "Baner, Pune",
      price: "₹2.2 Cr",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      bhk: 4
    },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Enhanced Loan Calculator States
  const [loanData, setLoanData] = useState({
    downPayment: property.minDownPayment || 1000000,
    tenure: 20,
    interestRate: property.interestRate || 8.5,
    propertyPrice: property.buyPrice,
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
    loanAmount: 0
  });

  // Calculate loan details
  useEffect(() => {
    const principal = loanData.propertyPrice - loanData.downPayment;
    const monthlyRate = loanData.interestRate / 12 / 100;
    const totalMonths = loanData.tenure * 12;
    
    if (principal > 0 && monthlyRate > 0 && totalMonths > 0) {
      const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      const totalPaymentValue = emiValue * totalMonths;
      const totalInterestValue = totalPaymentValue - principal;

      setLoanData(prev => ({
        ...prev,
        emi: Math.round(emiValue),
        totalInterest: Math.round(totalInterestValue),
        totalPayment: Math.round(totalPaymentValue),
        loanAmount: principal
      }));
    } else {
      setLoanData(prev => ({
        ...prev,
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
        loanAmount: 0
      }));
    }
  }, [loanData.downPayment, loanData.tenure, loanData.interestRate, loanData.propertyPrice]);

  // Animated display values
  const [displayValues, setDisplayValues] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0
  });

  useEffect(() => {
    const animateValue = (start, end, duration, key) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setDisplayValues(prev => ({ ...prev, [key]: value }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(displayValues.emi, loanData.emi, 1000, 'emi');
    animateValue(displayValues.totalInterest, loanData.totalInterest, 1000, 'totalInterest');
    animateValue(displayValues.totalPayment, loanData.totalPayment, 1000, 'totalPayment');
  }, [loanData.emi, loanData.totalInterest, loanData.totalPayment]);

  // Chart data calculations
  const chartData = {
    downPaymentPercent: Math.round((loanData.downPayment / loanData.propertyPrice) * 100),
    loanAmountPercent: Math.round((loanData.loanAmount / loanData.propertyPrice) * 100),
    interestRatio: loanData.totalPayment > 0 ? 
      Math.round((loanData.totalInterest / loanData.totalPayment) * 100) : 0,
    principalRatio: loanData.totalPayment > 0 ? 
      Math.round((loanData.loanAmount / loanData.totalPayment) * 100) : 0
  };

  const handleDownPaymentChange = (value) => {
    const newDownPayment = Math.min(Math.max(value, property.minDownPayment || 100000), loanData.propertyPrice);
    setLoanData(prev => ({ ...prev, downPayment: newDownPayment }));
  };

  const handleTenureChange = (value) => {
    setLoanData(prev => ({ ...prev, tenure: value }));
  };

  const handleInterestRateChange = (value) => {
    setLoanData(prev => ({ ...prev, interestRate: parseFloat(value) }));
  };

  const resetCalculator = () => {
    setLoanData({
      downPayment: property.minDownPayment || 1000000,
      tenure: 20,
      interestRate: property.interestRate || 8.5,
      propertyPrice: property.buyPrice,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      loanAmount: 0
    });
  };

  return (
    <div className="max-w-7xl mt-20 sm:mt-25 mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Property Header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-4">
            <img
              src={property.images?.[activeImage] || property.image}
              alt={property.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                {isFavorite ? (
                  <HeartIconSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <ShareIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              {activeImage + 1} / {property.images?.length || 1}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {property.images && property.images.length > 1 && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    activeImage === index 
                      ? 'border-red-500 scale-105' 
                      : 'border-transparent hover:border-red-300'
                  }`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="lg:w-1/2 lg:pl-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-[600] text-gray-900 mb-3 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span className="text-md">{property.location}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-xl sm:text-4xl font-bold text-red-600">
                ₹{property.buyPrice.toLocaleString()}
              </span>
              <span className="text-gray-500 text-md md:text-3xl">
                (₹{Math.round(property.buyPrice / 1800).toLocaleString()}/sq.ft.)
              </span>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <HomeIcon className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-gray-700">BHK</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{property.bhk}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-red-600 mr-2">🛁</div>
                <span className="font-semibold text-gray-700">Bathrooms</span>
              </div>
              <p className="text-2xl font-bold text-red-600">{property.bathrooms}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <BuildingStorefrontIcon className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-semibold text-gray-700">Furnishing</span>
              </div>
              <p className="text-lg font-bold text-red-600">{property.furnishing}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 text-red-600 mr-2">🚗</div>
                <span className="font-semibold text-gray-700">Parking</span>
              </div>
              <p className="text-lg font-bold text-red-600">{property.parking}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">Property Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(property.details || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{key}:</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 md:px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <ChatBubbleLeftIcon className="w-5 h-5" />
              WhatsApp
            </a>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-4 sm:px-6 md:px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <PhoneIcon className="w-5 h-5" />
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Property Overview */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl p-8 mb-12 shadow-inner">
        <h2 className="sm:text-3xl text-xl  font-bold mb-6 flex items-center gap-3">
          <BuildingStorefrontIcon className="w-8 h-8 text-red-600" />
          Property Overview
        </h2>
        <p className="text-gray-700 leading-relaxed text-md sm:text-lg">
          {property.description}
        </p>
      </div>

      {/* 🧮 Enhanced Loan & EMI Calculator Section */}
      <div className="mb-12 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl px-4 py-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-[18px] sm:text-3xl   font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <BanknotesIcon className="w-7 h-7 sm:w-10 sm:h-10 text-red-600" />
            Loan & EMI Calculator
          </h2>
          <p className="text-gray-600 text-lg">
            Calculate your monthly EMI and get detailed loan breakdown
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs and Summary */}
          <div className="space-y-6">
            {/* Property Price */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Property Price
              </label>
              <div className="flex items-center space-x-3">
                <CurrencyRupeeIcon className="w-6 h-6 text-gray-500" />
                <input
                  type="text"
                  value={`₹${loanData.propertyPrice.toLocaleString()}`}
                  readOnly
                  className="flex-1 text-2xl font-bold text-gray-900 bg-transparent border-none outline-none"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex sm:flex-row flex-col gap-2 justify-between items-center mb-4">
                <label className="block text-lg font-semibold text-gray-800">
                  Down Payment
                </label>
                <span className="text-sm text-gray-500 bg-red-50 px-3 py-1 rounded-full">
                  {chartData.downPaymentPercent}% of property value
                </span>
              </div>
              <div className="space-y-6">
                <input
                  type="range"
                  min={property.minDownPayment || 100000}
                  max={loanData.propertyPrice}
                  step="50000"
                  value={loanData.downPayment}
                  onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg  cursor-pointer accent-red-600"
                />
                <div className="flex items-center justify-start !pr-4 gap-2 w-100">
                  <CurrencyRupeeIcon className="w-6 h-6 text-gray-500" />
                  <input
                    type="number"
                    value={loanData.downPayment}
                    onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                    className="flex w-[40%] sm:w-[80%] text-md px-2 font-semibold text-gray-900 border border-gray-300 rounded-xl  py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Interest Rate & Tenure */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="6"
                  max="15"
                  value={loanData.interestRate}
                  onChange={(e) => handleInterestRateChange(e.target.value)}
                  className="w-full text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={loanData.tenure}
                  onChange={(e) => handleTenureChange(Number(e.target.value))}
                  className="w-full text-lg font-semibold text-gray-900 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Loan Summary Cards */}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <LoanSummaryCard
                icon={CurrencyRupeeIcon}
                title="Loan Amount"
                value={`₹${loanData.loanAmount.toLocaleString()}`}
                subtitle="Principal amount"
                color="blue"
              />
              <LoanSummaryCard
                icon={ChartBarIcon}
                title="Total Interest"
                value={`₹${displayValues.totalInterest.toLocaleString()}`}
                subtitle="Over loan tenure"
                color="yellow"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetCalculator}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Calculator
            </button>
          </div>

          {/* Right Column - Charts and EMI Display */}
          <div className="space-y-6">
            {/* EMI Display */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-3xl text-white text-center shadow-2xl">
              <p className="text-lg font-medium mb-2 opacity-90">Monthly EMI</p>
              <h3 className="text-4xl sm:text-4xl font-bold mb-4">
                ₹{displayValues.emi.toLocaleString()}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="opacity-80">Total Payment</p>
                  <p className="font-semibold text-md sm:text-lg">₹{displayValues.totalPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="opacity-80">Payable in</p>
                  <p className="font-semibold text-md sm:text-lg">{loanData.tenure} Years</p>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-2 gap-6">
              <CircularChart
                percentage={chartData.downPaymentPercent}
                label="Down Payment"
                value={`${chartData.downPaymentPercent}%`}
                color="red"
              />
              <CircularChart
                percentage={chartData.loanAmountPercent}
                label="Loan Amount"
                value={`${chartData.loanAmountPercent}%`}
                color="blue"
              />
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white py-6 px-2 sm:px-6 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Principal Amount</span>
                  <span className="font-semibold text-gray-800">₹{loanData.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-10">Total Interest</span>
                  <span className="font-semibold text-yellow-600">₹{loanData.totalInterest.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Payment</span>
                    <span className="text-lg font-bold text-red-600">₹{loanData.totalPayment.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Neighborhood */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
          <MapPinIcon className="w-8 h-8 text-red-600" />
          Location & Neighborhood
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src={mapURL}
            title="Property Location"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full"
          ></iframe>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Nearby Schools</h3>
            <p className="text-gray-600 text-sm">Delhi Public School, Vibgyor, National Public School</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Hospitals</h3>
            <p className="text-gray-600 text-sm">Apollo, Fortis, Cloudnine, Manipal Hospital</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Shopping & Entertainment</h3>
            <p className="text-gray-600 text-sm">Forum Mall, Nexus, Koramangala Market</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;