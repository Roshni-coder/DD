import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PropertyPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState({});
  const sliderRefs = useRef({});

  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    bhk: "",
    bathrooms: "",
    furnishing: "",
    parking: "",
    amenities: "",
  });

  // ✅ Property list (with interestRate & minDownPayment already included)
  const [properties] = useState([
    {
      id: 1,
      title: "2 BHK Apartment in Delhi",
      buyPrice: 7500000,
      rentPrice: 25000,
      bhk: 2,
      bathrooms: 2,
      furnishing: "Semi-Furnished",
      parking: "Yes",
      amenities: ["Gym", "Lift", "Power Backup", "Security", "Park"],
      type: "Apartment",
      location: "Rohini, Delhi",
      images: [
        "https://wallpapers.com/images/hd/real-estate-tropical-mansion-20c9os156eqcqd4j.jpg",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      description:
        "Spacious 2 BHK apartment located in Rohini, Delhi. Perfect for families.",
      interestRate: 8.45,
      minDownPayment: 1000000,
    },
    {
      id: 2,
      title: "3 BHK Villa in Bangalore",
      buyPrice: 12500000,
      rentPrice: 45000,
      bhk: 3,
      bathrooms: 3,
      furnishing: "Furnished",
      parking: "Yes",
      amenities: ["Garden", "Swimming Pool", "Gym", "Club House", "Parking"],
      type: "Villa",
      location: "Whitefield, Bangalore",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      description:
        "Luxurious villa in Whitefield with modern interiors and garden area.",
      interestRate: 8.25,
      minDownPayment: 2000000,
    },
    {
      id: 3,
      title: "1 BHK Studio in Mumbai",
      buyPrice: 5500000,
      rentPrice: 18000,
      bhk: 1,
      bathrooms: 1,
      furnishing: "Unfurnished",
      parking: "No",
      amenities: ["Lift", "Security", "Water Supply"],
      type: "Studio",
      location: "Andheri, Mumbai",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      description:
        "Compact and affordable 1 BHK studio located in Andheri, Mumbai.",
      interestRate: 8.75,
      minDownPayment: 700000,
    },
    {
      id: 4,
      title: "Luxury 4 BHK Penthouse in Pune",
      buyPrice: 22000000,
      rentPrice: 65000,
      bhk: 4,
      bathrooms: 4,
      furnishing: "Furnished",
      parking: "Yes",
      amenities: ["Gym", "Swimming Pool", "Garden", "Club House", "Security", "Power Backup"],
      type: "Penthouse",
      location: "Baner, Pune",
      images: [
        "https://ap.rdcpix.com/e391eb4cdcaae55b22e30baf5f740e4bl-b1492142831od-w480_h360_x2.jpg",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      description:
        "Luxury penthouse with skyline views and premium facilities.",
      interestRate: 7.95,
      minDownPayment: 3000000,
    },
    {
      id: 5,
      title: "3 BHK Apartment in Hyderabad",
      buyPrice: 9800000,
      rentPrice: 32000,
      bhk: 3,
      bathrooms: 2,
      furnishing: "Semi-Furnished",
      parking: "Yes",
      amenities: ["Lift", "Gym", "Park", "Security", "Water Supply"],
      type: "Apartment",
      location: "Gachibowli, Hyderabad",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      ],
      description:
        "Modern 3 BHK apartment near IT hub, ideal for working professionals.",
      interestRate: 8.35,
      minDownPayment: 1200000,
    },
  ]);

  // Initialize current slide state
  useEffect(() => {
    const initialSlides = {};
    properties.forEach(property => {
      initialSlides[property.id] = 0;
    });
    setCurrentSlide(initialSlides);
  }, []);

  // Enhanced slider navigation
  const nextSlide = (propertyId, event) => {
    event.stopPropagation();
    setCurrentSlide(prev => {
      const current = prev[propertyId] || 0;
      const totalSlides = properties.find(p => p.id === propertyId)?.images.length || 1;
      return {
        ...prev,
        [propertyId]: (current + 1) % totalSlides
      };
    });
  };

  const prevSlide = (propertyId, event) => {
    event.stopPropagation();
    setCurrentSlide(prev => {
      const current = prev[propertyId] || 0;
      const totalSlides = properties.find(p => p.id === propertyId)?.images.length || 1;
      return {
        ...prev,
        [propertyId]: (current - 1 + totalSlides) % totalSlides
      };
    });
  };

  // Favorite toggle
  const toggleFavorite = (propertyId, event) => {
    event.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  // Filtering logic (unchanged)
  const filteredProperties = properties.filter((p) => {
    const priceField = mode === "buy" ? "buyPrice" : "rentPrice";
    const matchesPriceFrom =
      !filters.priceFrom || p[priceField] >= Number(filters.priceFrom);
    const matchesPriceTo =
      !filters.priceTo || p[priceField] <= Number(filters.priceTo);
    const matchesBhk = !filters.bhk || p.bhk === Number(filters.bhk);
    const matchesBath =
      !filters.bathrooms || p.bathrooms === Number(filters.bathrooms);
    const matchesFurnish =
      !filters.furnishing || p.furnishing === filters.furnishing;
    const matchesParking = !filters.parking || p.parking === filters.parking;
    const matchesAmenities =
      !filters.amenities || p.amenities.includes(filters.amenities);

    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSearch &&
      matchesPriceFrom &&
      matchesPriceTo &&
      matchesBhk &&
      matchesBath &&
      matchesFurnish &&
      matchesParking &&
      matchesAmenities
    );
  });

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () =>
    setFilters({
      priceFrom: "",
      priceTo: "",
      bhk: "",
      bathrooms: "",
      furnishing: "",
      parking: "",
      amenities: "",
    });

  // ✅ Pass full property data including financials to details page
  const viewDetails = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  // Amenity icons mapping
  const amenityIcons = {
    "Gym": "🏋️",
    "Lift": "🛗",
    "Garden": "🌳",
    "Swimming Pool": "🏊",
    "Park": "🌲",
    "Security": "👮",
    "Power Backup": "🔋",
    "Club House": "🏛️",
    "Parking": "🅿️",
    "Water Supply": "💧"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Search Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 bg-white rounded-full shadow-lg px-4 py-3">
          <AiOutlineSearch className="text-gray-500 text-2xl ml-2" />
          <input
            type="text"
            placeholder="Search by city, locality, or property type..."
            className="flex-1 text-gray-700 outline-none px-3 bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setMode("buy")}
              className={`px-12 py-2 rounded-full font-semibold transition-all duration-300 ${
                mode === "buy"
                  ? "bg-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-gray-100 text-red-600 hover:bg-red-50 hover:shadow-md"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setMode("rent")}
              className={`px-12 py-2 rounded-full font-semibold transition-all duration-300 ${
                mode === "rent"
                  ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                  : "bg-gray-100 text-blue-700 hover:bg-blue-50 hover:shadow-md"
              }`}
            >
              Rent
            </button>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row w-[95%] gap-5 m-auto flex-grow pb-8">
        {/* Left Filters */}
        <aside className="md:w-1/4 bg-white p-6 shadow-lg border-r rounded-xl border-gray-200 h-fit sticky top-4">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 pb-2 border-b border-gray-200">
            Filters
          </h2>

          {/* Price Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === "buy" ? "Price Range (₹)" : "Rent Range (₹/month)"}
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                onChange={handleChange}
                placeholder="From"
                className="w-1/2 border border-gray-300 rounded-lg text-center p-2 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <input
                type="number"
                name="priceTo"
                value={filters.priceTo}
                onChange={handleChange}
                placeholder="To"
                className="w-1/2 border border-gray-300 rounded-lg text-center p-2 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Other Filters */}
          {[
            { label: "BHK", name: "bhk", options: ["", "1", "2", "3", "4+"] },
            {
              label: "Bathrooms",
              name: "bathrooms",
              options: ["", "1", "2", "3+"],
            },
            {
              label: "Furnishing",
              name: "furnishing",
              options: ["", "Unfurnished", "Semi-Furnished", "Furnished"],
            },
            { label: "Parking", name: "parking", options: ["", "Yes", "No"] },
            {
              label: "Amenities",
              name: "amenities",
              options: ["", "Gym", "Lift", "Garden", "Swimming Pool", "Security", "Power Backup"],
            },
          ].map((filter) => (
            <div key={filter.name} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </label>
              <select
                name={filter.name}
                value={filters[filter.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt || "All"}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Reset Filters
          </button>
        </aside>

        {/* Property List */}
        <main className="flex-1 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {mode === "buy"
              ? "🏠 Properties for Sale"
              : "🏢 Properties for Rent"}
          </h2>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No properties match your filters 😔</p>
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
                  onClick={() => viewDetails(p)}
                >
                  {/* Enhanced Image Slider */}
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-out h-full"
                      style={{ transform: `translateX(-${(currentSlide[p.id] || 0) * 100}%)` }}
                    >
                      {p.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${p.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover flex-shrink-0"
                        />
                      ))}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(p.id, e)}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                    >
                      {favorites.has(p.id) ? (
                        <AiFillHeart className="text-red-500 text-xl" />
                      ) : (
                        <AiOutlineHeart className="text-gray-600 text-xl hover:text-red-500" />
                      )}
                    </button>

                    {/* Slider Navigation */}
                    <button
                      onClick={(e) => prevSlide(p.id, e)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                    >
                      <AiOutlineLeft className="text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => nextSlide(p.id, e)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                    >
                      <AiOutlineRight className="text-gray-700" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {p.images.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === (currentSlide[p.id] || 0)
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Property Type Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      {p.type}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800 truncate flex-1">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">{p.location}</p>

                    <p
                      className={`text-xl font-bold mb-3 ${
                        mode === "buy" ? "text-red-600" : "text-blue-600"
                      }`}
                    >
                      ₹
                      {mode === "buy"
                        ? p.buyPrice.toLocaleString()
                        : p.rentPrice.toLocaleString()}
                      {mode === "rent" && (
                        <span className="text-sm text-gray-500"> /month</span>
                      )}
                    </p>

                    {/* Financial Info */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Interest Rate:</span>
                          <span className="font-semibold text-gray-700 ml-1">
                            {p.interestRate}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Down Payment:</span>
                          <span className="font-semibold text-gray-700 ml-1">
                            ₹{p.minDownPayment.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{p.bhk} BHK</span>
                      <span>•</span>
                      <span>{p.bathrooms} Bath</span>
                      <span>•</span>
                      <span>{p.furnishing}</span>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {p.amenities.slice(0, 4).map((amenity, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600"
                          >
                            {amenityIcons[amenity]} {amenity}
                          </span>
                        ))}
                        {p.amenities.length > 4 && (
                          <span className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-lg text-xs text-gray-600">
                            +{p.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDetails(p);
                      }}
                      className="w-full py-3 rounded-xl border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 font-semibold hover:shadow-lg"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PropertyPage;