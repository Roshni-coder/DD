import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEnvironment,
} from "react-icons/ai";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { MdPool, MdFitnessCenter, MdLocalParking } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const PropertyPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState({});
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState("");

  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    category: "",
    subcategory: "",
    buildingType: "",
    propertyType: "",
    size: "",
    location: "All",
  });

  // Fetch Properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
       const res = await axios.get(`${API_BASE}/api/properties/property-list`);
        setProperties(res.data.data || []);
        const locs = [
          ...new Set(
            res.data.data.map(
              (p) => p.address?.city || p.location || "Unknown"
            )
          ),
        ];
        setLocations(["All", ...locs]);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Fetch Categories
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

  // Fetch Subcategories when Category changes
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

  // Initialize Slides
  useEffect(() => {
    const slides = {};
    properties.forEach((p) => (slides[p._id] = 0));
    setCurrentSlide(slides);
  }, [properties]);

  // Detect User Location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const detectedCity = response.data.city || response.data.locality;
          if (detectedCity) {
            setUserLocation(detectedCity);
            setFilters((prev) => ({ ...prev, location: detectedCity }));
          }
        } catch (err) {
          console.error("Error fetching location:", err);
        }
      },
      () => alert("Unable to fetch your location.")
    );
  };

  // Toggle Favorite
  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFav = new Set(prev);
      newFav.has(id) ? newFav.delete(id) : newFav.add(id);
      return newFav;
    });
  };

  // Filter Handling
  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () =>
    setFilters({
      priceFrom: "",
      priceTo: "",
      category: "",
      subcategory: "",
      buildingType: "",
      propertyType: "",
      size: "",
      location: "All",
    });

  // Filter Logic
  // Filter Logic
const filteredProperties = properties.filter((p) => {
  const price = Number(p.price) || 0;
  const search = searchQuery.trim().toLowerCase();

  // Normalize
  const city = (p.address?.city || "").toLowerCase();
  const categoryName = (p.category?.name || "").toLowerCase();
  const subcategoryName = (p.subcategory?.name || "").toLowerCase();
  const title = (p.title || "").toLowerCase();

  // ✅ Search Match
  const matchesSearch =
    !search ||
    title.includes(search) ||
    city.includes(search) ||
    categoryName.includes(search) ||
    subcategoryName.includes(search);

  // ✅ Category & Subcategory Match
  const matchesCategory =
    !filters.category || p.category?._id === filters.category;

  const matchesSubcategory =
    !filters.subcategory || p.subcategory?._id === filters.subcategory;

  // ✅ Price Range Match
  const from = Number(filters.priceFrom) || 0;
  const to = Number(filters.priceTo) || Infinity;
  const matchesPrice = price >= from && price <= to;

  // ✅ Building Type Match
  const matchesBuildingType =
    !filters.buildingType ||
    p.buildingType?.toLowerCase() === filters.buildingType.toLowerCase();

  // ✅ Property Type Match
  const matchesPropertyType =
    !filters.propertyType ||
    p.propertyType?.toLowerCase() === filters.propertyType.toLowerCase();

  // ✅ Size (Bedrooms) Match
  const matchesSize =
    !filters.size ||
    p.size?.toLowerCase().replace(/\s+/g, "") ===
      filters.size.toLowerCase().replace(/\s+/g, "");

  // ✅ Location Match
  const matchesLocation =
    filters.location === "All" ||
    city === filters.location.toLowerCase();

  return (
    matchesSearch &&
    matchesCategory &&
    matchesSubcategory &&
    matchesPrice &&
    matchesBuildingType &&
    matchesPropertyType &&
    matchesSize &&
    matchesLocation
  );
});

  const viewDetails = (property) =>
    navigate(`/properties/${property._id}`, { state: { property } });

  // Helper to display amenities
  const renderAmenities = (amenities) =>
    amenities?.map((a, i) => (
      <span
        key={i}
        className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700 flex items-center gap-1"
      >
        {a === "Pool" && <MdPool className="text-blue-500" />}
        {a === "Gym" && <MdFitnessCenter className="text-red-500" />}
        {a === "Parking" && <MdLocalParking className="text-green-500" />}
        {a}
      </span>
    ));

  return (
    <div className="min-h-screen my-10 bg-gray-50 flex flex-col">
      {/* Search + Location */}
      <section className="py-4 px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 my-2 flex items-center border border-gray-300 rounded-full px-3 py-4 bg-white shadow-sm hover:bg-gray-100 transition">
            <AiOutlineSearch className="text-gray-500 text-xl mr-2" />
            <input
              type="text"
              placeholder="Search by city, category, or property title..."
              className="flex-1 outline-none text-gray-700 text-sm sm:text-base bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location + Detect */}
          <div className="flex items-center gap-3">
            <select
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-full px-4 py-4 bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 text-sm transition focus:ring-2 focus:ring-red-500"
            >
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <button
              onClick={detectLocation}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm"
            >
              <AiOutlineEnvironment className="text-xl" />
              Detect
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full gap-4 mx-auto flex-grow">
        {/* Sidebar Filters */}
        {/* Sidebar Filters */}
{/* Sidebar Filters */}
<aside className="md:w-1/4 bg-white p-4 sm:p-6 shadow-lg border rounded-2xl border-gray-200 h-full overflow-y-auto sticky top-4">
  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
    Filters
  </h2>

  {/* Building Type */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Building Type
    </label>
    <div className="flex flex-wrap gap-2">
      {["Residential", "Commercial"].map((type) => (
        <button
          key={type}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              buildingType: prev.buildingType === type ? "" : type,
            }))
          }
          className={`px-3 py-1.5 text-sm rounded-full border transition ${
            filters.buildingType === type
              ? "bg-red-500 text-white border-red-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>

  {/* Property Type */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Property Type
    </label>
    <div className="flex flex-wrap gap-2">
      {[
        "Apartment",
        "Plot",
        "Builder Floor",
        "Villa",
        "Penthouse",
        "Independent House",
      ].map((type) => (
        <button
          key={type}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              propertyType: prev.propertyType === type ? "" : type,
            }))
          }
          className={`px-3 py-1.5 text-sm rounded-full border transition ${
            filters.propertyType === type
              ? "bg-red-500 text-white border-red-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>

  {/* Size (Bedrooms) */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Size (Bedrooms)
    </label>
    <div className="flex flex-wrap gap-2">
      {[
        "1 RK",
        "1 BHK",
        "1.5 BHK",
        "2 BHK",
        "2.5 BHK",
        "3 BHK",
        "3.5 BHK",
        "4 BHK",
        "5 BHK",
        "6 BHK",
        "6+ BHK",
        "Studio",
      ].map((size) => (
        <button
          key={size}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              size: prev.size === size ? "" : size,
            }))
          }
          className={`px-3 py-1.5 text-sm rounded-full border transition ${
            filters.size === size
              ? "bg-red-500 text-white border-red-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  </div>

  {/* Category */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Category
    </label>
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              category: prev.category === cat._id ? "" : cat._id,
              subcategory: "", // reset subcategory when changing category
            }))
          }
          className={`px-3 py-1.5 text-sm rounded-full border transition ${
            filters.category === cat._id
              ? "bg-red-500 text-white border-red-500"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  </div>

  {/* Subcategory */}
  {filters.category && (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Subcategory
      </label>
      <div className="flex flex-wrap gap-2">
        {subcategories
          .filter((sub) => sub.category === filters.category)
          .map((sub) => (
            <button
              key={sub._id}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  subcategory: prev.subcategory === sub._id ? "" : sub._id,
                }))
              }
              className={`px-3 py-1.5 text-sm rounded-full border transition ${
                filters.subcategory === sub._id
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {sub.name}
            </button>
          ))}
      </div>
    </div>
  )}

  {/* Price Range */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Price Range (₹)
    </label>
    <div className="flex space-x-2">
      <input
        type="number"
        name="priceFrom"
        value={filters.priceFrom}
        onChange={handleChange}
        placeholder="From"
        className="w-1/2 border border-gray-300 rounded-lg text-center p-2 text-sm bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 transition"
      />
      <input
        type="number"
        name="priceTo"
        value={filters.priceTo}
        onChange={handleChange}
        placeholder="To"
        className="w-1/2 border border-gray-300 rounded-lg text-center p-2 text-sm bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 transition"
      />
    </div>
  </div>

  <button
    onClick={resetFilters}
    className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 hover:scale-[1.02] transition"
  >
    Reset Filters
  </button>
</aside>



        {/* Property Display */}
        <main className="flex-1 p-2 sm:p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            🏠 Available Properties
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 py-20">
              Loading properties...
            </p>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-3">
                No available properties in this location 😔
              </p>
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1"
                  onClick={() => viewDetails(p)}
                >
                  {/* Image Slider */}
                  <div className="relative h-60 sm:h-64 overflow-hidden">
                    <div
                      className="flex transition-transform duration-500 h-full"
                      style={{
                        transform: `translateX(-${
                          (currentSlide[p._id] || 0) * 100
                        }%)`,
                      }}
                    >
                      {p.images?.length > 0 ? (
                        p.images.map((img, i) => (
                          <img
                            key={i}
                            src={`${API_BASE}${img}`}
                            alt="property"
                            className="w-full h-full object-cover flex-shrink-0"
                          />
                        ))
                      ) : (
                        <img
                          src="/no-image.jpg"
                          alt="no"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={(e) => toggleFavorite(p._id, e)}
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:scale-110 transition"
                    >
                      {favorites.has(p._id) ? (
                        <AiFillHeart className="text-red-500 text-xl" />
                      ) : (
                        <AiOutlineHeart className="text-gray-600 text-xl hover:text-red-500" />
                      )}
                    </button>

                    {/* Navigation */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => ({
                          ...prev,
                          [p._id]:
                            (prev[p._id] - 1 + (p.images?.length || 1)) %
                            (p.images?.length || 1),
                        }));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineLeft />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide((prev) => ({
                          ...prev,
                          [p._id]: (prev[p._id] + 1) % (p.images?.length || 1),
                        }));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineRight />
                    </button>
                  </div>

                  {/* Property Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {p.address?.city || "—"}
                    </p>
                    <p className="text-lg font-semibold text-red-600 mb-3">
                      ₹{p.price?.toLocaleString() || "N/A"}
                    </p>

                    <div className="flex flex-wrap gap-3 text-gray-600 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <FaBed className="text-blue-500" />
                        <span>{p.bedrooms || "-"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBath className="text-purple-500" />
                        <span>{p.bathrooms || "-"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRulerCombined className="text-green-500" />
                        <span>{p.size || "-"}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {renderAmenities(p.amenities)}
                    </div>
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