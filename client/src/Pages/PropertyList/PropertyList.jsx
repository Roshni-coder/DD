import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
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
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
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
      amenities: [
        "Garden",
        "Swimming Pool",
        "Gym",
        "Club House",
        "Parking",
      ],
      type: "Villa",
      location: "Whitefield, Bangalore",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
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
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      ],
      description:
        "Compact and affordable 1 BHK studio located in Andheri, Mumbai.",
      interestRate: 8.75,
      minDownPayment: 700000,
    },
  ]);

  useEffect(() => {
    const initialSlides = {};
    properties.forEach((p) => (initialSlides[p.id] = 0));
    setCurrentSlide(initialSlides);
  }, [properties]);

  const nextSlide = (id, e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => {
      const total = properties.find((p) => p.id === id)?.images.length || 1;
      return { ...prev, [id]: (prev[id] + 1) % total };
    });
  };
  const prevSlide = (id, e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => {
      const total = properties.find((p) => p.id === id)?.images.length || 1;
      return { ...prev, [id]: (prev[id] - 1 + total) % total };
    });
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFav = new Set(prev);
      newFav.has(id) ? newFav.delete(id) : newFav.add(id);
      return newFav;
    });
  };

  const filteredProperties = properties.filter((p) => {
    const priceField = mode === "buy" ? "buyPrice" : "rentPrice";
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!filters.priceFrom || p[priceField] >= +filters.priceFrom) &&
      (!filters.priceTo || p[priceField] <= +filters.priceTo);
    const matchesBhk = !filters.bhk || p.bhk === +filters.bhk;
    const matchesBath =
      !filters.bathrooms || p.bathrooms === +filters.bathrooms;
    const matchesFurnish =
      !filters.furnishing || p.furnishing === filters.furnishing;
    const matchesParking = !filters.parking || p.parking === filters.parking;
    const matchesAmenities =
      !filters.amenities || p.amenities.includes(filters.amenities);
    return (
      matchesSearch &&
      matchesPrice &&
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

  const viewDetails = (property) =>
    navigate(`/property/${property.id}`, { state: { property } });

  const amenityIcons = {
    Gym: "🏋️",
    Lift: "🛗",
    Garden: "🌳",
    "Swimming Pool": "🏊",
    Park: "🌲",
    Security: "👮",
    "Power Backup": "🔋",
    "Club House": "🏛️",
    Parking: "🅿️",
    "Water Supply": "💧",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 🔍 Search Section */}
      <section className="py-6 px-4 sm:px-6 mt-25">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-white rounded-4xl md:rounded-full shadow-xl px-4 py-4 border border-gray-100">
          <div className="flex items-center border border-gray-300 rounded-full w-full sm:w-auto flex-1 px-3">
            <AiOutlineSearch className="text-gray-500 text-xl sm:text-2xl hidden sm:block" />
            <input
              type="text"
              placeholder="Search by city, locality, or property type..."
              className="flex-1 text-gray-700 outline-none px-3 py-2 text-sm sm:text-base bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full sm:w-auto justify-center gap-2 sm:gap-4">
            <button
              onClick={() => setMode("buy")}
              className={`w-1/2 sm:w-auto px-8 py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${
                mode === "buy"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-red-600 hover:bg-red-50"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setMode("rent")}
              className={`w-1/2 sm:w-auto px-8 py-2 rounded-full font-semibold text-sm sm:text-base transition-all ${
                mode === "rent"
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-gray-100 text-blue-700 hover:bg-blue-50"
              }`}
            >
              Rent
            </button>
          </div>
        </div>
      </section>

      {/* 🏠 Main Section */}
      <div className="flex flex-col md:flex-row w-[95%] gap-6 mx-auto flex-grow pb-8">
        {/* Filters (responsive scroll on mobile) */}
        <aside className="md:w-1/4 bg-white p-6 shadow-lg border-r rounded-xl border-gray-200 h-fit md:sticky md:top-4 overflow-y-auto max-h-[85vh]">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
            Filters
          </h2>

          {/* Price */}
          <div className="mb-5">
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
                className="w-1/2 border rounded-lg text-center p-2 text-sm focus:ring-2 "
              />
              <input
                type="number"
                name="priceTo"
                value={filters.priceTo}
                onChange={handleChange}
                placeholder="To"
                className="w-1/2 border rounded-lg text-center p-2 text-sm focus:ring-2"
              />
            </div>
          </div>

          {/* Other Filters */}
          {[
            { label: "BHK", name: "bhk", options: ["", "1", "2", "3", "4+"] },
            { label: "Bathrooms", name: "bathrooms", options: ["", "1", "2", "3+"] },
            { label: "Furnishing", name: "furnishing", options: ["", "Unfurnished", "Semi-Furnished", "Furnished"] },
            { label: "Parking", name: "parking", options: ["", "Yes", "No"] },
            { label: "Amenities", name: "amenities", options: ["", "Gym", "Lift", "Garden", "Swimming Pool", "Security", "Power Backup"] },
          ].map((filter) => (
            <div key={filter.name} className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>
              <select
                name={filter.name}
                value={filters[filter.name]}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
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
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
          >
            Reset Filters
          </button>
        </aside>

        {/* Property List */}
        <main className="flex-1 p-4 sm:p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            {mode === "buy" ? "🏠 Properties for Sale" : "🏢 Properties for Rent"}
          </h2>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4 text-base sm:text-lg">
                No properties match your filters 😔
              </p>
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-lg  hover:shadow-2xl transition-transform duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1"
                  onClick={() => viewDetails(p)}
                >
                  <div className="relative h-60 sm:h-64 overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 h-full"
                      style={{
                        transform: `translateX(-${(currentSlide[p.id] || 0) * 100}%)`,
                      }}
                    >
                      {p.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="w-full h-full object-cover flex-shrink-0"
                        />
                      ))}
                    </div>

                    {/* Fav Button */}
                    <button
                      onClick={(e) => toggleFavorite(p.id, e)}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:scale-110 transition"
                    >
                      {favorites.has(p.id) ? (
                        <AiFillHeart className="text-red-500 text-xl" />
                      ) : (
                        <AiOutlineHeart className="text-gray-600 text-xl hover:text-red-500" />
                      )}
                    </button>

                    {/* Navigation */}
                    <button
                      onClick={(e) => prevSlide(p.id, e)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineLeft />
                    </button>
                    <button
                      onClick={(e) => nextSlide(p.id, e)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineRight />
                    </button>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {p.type}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{p.location}</p>
                    <p
                      className={`text-lg font-semibold ${
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

                    <div className="text-sm text-gray-600 mt-3 flex gap-2">
                      <span>{p.bhk} BHK</span>•<span>{p.bathrooms} Bath</span>•
                      <span>{p.furnishing}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDetails(p);
                      }}
                      className="w-full mt-4 py-2 rounded-xl border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold transition"
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
