import React, { useState, useEffect } from "react";
import { 
  AiOutlineSearch, AiOutlineHeart, AiFillStar, AiOutlineCheckCircle, AiOutlineRocket,
  AiOutlineUser
} from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare } from "react-icons/fa";
import img from '../../assets/Villa.jpg';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  const properties = [
    { id:1, title:"Luxury 2BHK Apartment", price:"₹45 Lakh", location:"Whitefield, Bangalore", image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80", beds:2, baths:2, area:"1200 sq ft", featured:true },
    { id:2, title:"Modern 3BHK Villa", price:"₹75 Lakh", location:"Bandra West, Mumbai", image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"1800 sq ft", featured:true },
    { id:3, title:"Premium Penthouse", price:"₹1.2 Cr", location:"Koregaon Park, Pune", image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"2200 sq ft", featured:true },
     { id:4, title:"Luxury 2BHK Apartment", price:"₹45 Lakh", location:"Whitefield, Bangalore", image:"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80", beds:2, baths:2, area:"1200 sq ft", featured:true },
    { id:5, title:"Modern 3BHK Villa", price:"₹75 Lakh", location:"Bandra West, Mumbai", image:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"1800 sq ft", featured:true },
    { id:6, title:"Premium Penthouse", price:"₹1.2 Cr", location:"Koregaon Park, Pune", image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", beds:3, baths:3, area:"2200 sq ft", featured:true }
  ];

  const testimonials = [
    { name:"Rajesh Kumar", role:"Home Buyer", location:"Bangalore", text:"Found my dream home without paying any brokerage. Saved over ₹3 lakhs.", rating:5, avatar:"RK" },
    { name:"Priya Sharma", role:"Property Investor", location:"Mumbai", text:"Verified listings saved me from fraudulent properties.", rating:5, avatar:"PS" },
    { name:"Amit Patel", role:"NRI Investor", location:"Pune", text:"As an NRI, DealDirect made property investment transparent and easy.", rating:4, avatar:"AP" }
  ];

  const stats = [
    { number:"10,000+", label:"Properties Listed" },
    { number:"₹2,500Cr+", label:"Property Value" },
    { number:"98%", label:"Customer Satisfaction" },
    { number:"0%", label:"Brokerage Fee" }
  ];

  // Features
  const features = [
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Verified Listings", description:"All properties are verified to ensure authenticity." },
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"No Brokerage", description:"Direct contact with owners saves you huge brokerage fees." },
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Easy Search", description:"Advanced filters and search options for quick results." }
  ];

  const advantages = [
    { icon:<BsCheckCircle className="text-red-600 text-3xl"/>, title:"Trusted Platform", description:"Thousands of users trust DealDirect for property deals." },
    { icon:<BsCheckCircle className="text-red-600 text-3xl"/>, title:"Transparent Deals", description:"Complete transparency in property pricing and documents." },
    { icon:<BsCheckCircle className="text-red-600 text-3xl"/>, title:"24/7 Support", description:"Our team is always ready to assist buyers and sellers." }
  ];

  const processSteps = [
    { number:1, icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Search Properties", description:"Use our filters to find properties matching your needs." },
    { number:2, icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Connect with Owner", description:"Directly communicate with property owners without brokers." },
    { number:3, icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Finalize Deal", description:"Complete transactions transparently and securely." }
  ];

  const builderFeatures = [
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Project Showcase", description:"Display your projects to genuine buyers." },
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Increase Leads", description:"Reach buyers who are ready to invest." },
    { icon:<AiOutlineCheckCircle className="text-red-600 text-3xl"/>, title:"Track Performance", description:"Monitor your listing performance in real-time." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const filteredProperties = properties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <section className="relative h-[70vh] text-white flex items-center">
        <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-6 md:w-2/3 space-y-6">
          <div className="inline-flex items-center !bg-white !text-black bg-opacity-20 px-3 py-1 rounded-full text-sm">
            <AiOutlineCheckCircle className="mr-2 !text-black"/> No Brokerage • Verified Listings
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            Find Your <br /><span className="text-white">Dream Home</span> <br /> Without Brokerage
          </h1>
          <p className="text-lg md:text-[18px] drop-shadow-md">
            Connect directly with verified property owners and save on brokerage fees.
          </p>
          <div className="flex gap-4 mt-4">
            <button className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:shadow-md transition">Explore Properties</button>
            <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition">List Your Property</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow py-6">
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.number}</div>
              <div className="text-gray-500 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 container mx-auto px-6">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" 
            placeholder="Search by city, locality, project..." 
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition flex items-center gap-2">
            <AiOutlineSearch /> Search
          </button>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-64 object-cover"/>
                {property.featured && <div className="absolute top-3 left-3 bg-white text-gray-900 px-3 py-1 rounded-full text-sm">Featured</div>}
                <button className="absolute top-3 right-3 text-white text-xl"><AiOutlineHeart /></button>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="flex items-center gap-2 text-gray-500 text-sm"><FaMapMarkerAlt /> {property.location}</p>
                <div className="flex gap-4 text-gray-600 text-sm mt-2">
                  <span className="flex items-center gap-1"><FaBed /> {property.beds} Beds</span>
                  <span className="flex items-center gap-1"><FaBath /> {property.baths} Baths</span>
                  <span className="flex items-center gap-1"><FaVectorSquare /> {property.area}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-red-600">{property.price}</span>
                  <button className="text-white bg-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-700 transition">Contact Owner</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose DealDirect?</h2>
          <p className="text-center text-gray-600 mb-12">Experience real estate like never before with our unique advantages</p>
          <div className="grid  grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white px-6 !py-6 rounded-xl shadow text-center space-y-4 hover:shadow-lg transition">
                <div className="flex justify-center text-4xl">{feature.icon}</div>
                <h3 className="font-semibold text-2xl">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Key Advantages</h2>
        <p className="text-center text-gray-600 mb-12">Discover why thousands of buyers and sellers trust DealDirect</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow text-center space-y-4 hover:shadow-lg transition">
              <div className="flex justify-center">{adv.icon}</div>
              <h3 className="font-semibold text-lg">{adv.title}</h3>
              <p className="text-gray-500 text-sm">{adv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">How DealDirect Works</h2>
          <p className="text-center text-gray-600 mb-12">Simple, transparent, and efficient process for buyers and sellers</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow text-center space-y-4 hover:shadow-lg transition">
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Builders Section */}
      <section className="py-12 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">For Builders & Developers</h2>
        <p className="text-center text-gray-600 mb-12">Showcase your projects to genuine buyers and increase conversions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {builderFeatures.map((bf, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow text-center space-y-4 hover:shadow-lg transition">
              <div className="flex justify-center">{bf.icon}</div>
              <h3 className="font-semibold text-lg">{bf.title}</h3>
              <p className="text-gray-500 text-sm">{bf.description}</p>
            </div>
          ))}
        </div>
        <div className="flex  justify-center">
          <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 flex items-center gap-2 transition">
            Join as Builder <AiOutlineRocket />
          </button>
        </div>
      </section>
       <section className="bg-red-100 py-20">
        <div className="container mx-auto px-6 text-center space-y-6">
          <h2 className="text-5xl font-bold">Ready to Find Your Dream Property?</h2>
          <p className="text-gray-600">Join 50,000+ satisfied customers who found their perfect home without brokerage fees</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
            <button className="bg-red-600 text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-500 transition">
              <AiOutlineSearch /> Browse Properties
            </button>
            <button className="border border-bule-400 text-red-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-yellow-400 hover:text-gray-900 transition">
              <AiOutlineUser /> List Your Property
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-gray-700 text-sm">
            <span className="flex items-center gap-1"><BsCheckCircle className="text-red-400" /> No Brokerage Fees</span>
            <span className="flex items-center gap-1"><BsCheckCircle className="text-red-400" /> Verified Listings</span>
            <span className="flex items-center gap-1"><BsCheckCircle className="text-red-400" /> Direct Contact</span>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
