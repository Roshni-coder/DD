import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:9000";

const PropertyPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState({});
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🏷️ Categories & Subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // ✅ Basic Filters (Only Category, Subcategory, Price)
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    category: "",
    subcategory: "",
  });

  // 🏠 Fetch Properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/properties/list`);
        setProperties(res.data.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // 🗂️ Fetch Categories
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

  // 🧩 Fetch Subcategories when Category changes
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

  // 🖼️ Initialize Slides
  useEffect(() => {
    const slides = {};
    properties.forEach((p) => (slides[p._id] = 0));
    setCurrentSlide(slides);
  }, [properties]);

  const nextSlide = (id, e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => {
      const total = properties.find((p) => p._id === id)?.images?.length || 1;
      return { ...prev, [id]: (prev[id] + 1) % total };
    });
  };

  const prevSlide = (id, e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => {
      const total = properties.find((p) => p._id === id)?.images?.length || 1;
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

  // 🔍 Filter + Search Logic
  const filteredProperties = properties.filter((p) => {
    const price = p.price || 0;
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subcategory?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !filters.category || p.category?._id === filters.category;
    const matchesSubcategory =
      !filters.subcategory || p.subcategory?._id === filters.subcategory;
    const matchesPrice =
      (!filters.priceFrom || price >= +filters.priceFrom) &&
      (!filters.priceTo || price <= +filters.priceTo);

    return matchesSearch && matchesPrice && matchesCategory && matchesSubcategory;
  });

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const resetFilters = () =>
    setFilters({
      priceFrom: "",
      priceTo: "",
      category: "",
      subcategory: "",
    });

  const viewDetails = (property) =>
    navigate(`/properties/${property._id}`, { state: { property } });

  return (
    <div className="min-h-screen mt-5 bg-gray-50 flex flex-col">
      {/* 🔍 Search Bar */}
      <section className="py-6 px-4 sm:px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-white rounded-4xl md:rounded-full shadow-xl px-4 py-4 border border-gray-100">
          <div className="flex items-center border border-gray-300 rounded-full w-full sm:w-auto flex-1 px-3">
            <AiOutlineSearch className="text-gray-500 text-xl sm:text-2xl hidden sm:block" />
            <input
              type="text"
              placeholder="Search by city, category, or property title..."
              className="flex-1 text-gray-700 outline-none px-3 py-2 text-sm sm:text-base bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 🏠 Main Content */}
      <div className="flex flex-col md:flex-row w-[95%] gap-6 mx-auto flex-grow pb-8">
        {/* Sidebar Filters */}
        <aside className="md:w-1/4 bg-white p-6 shadow-lg border-r rounded-xl border-gray-200 h-fit md:sticky md:top-4">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
            Filters
          </h2>

          {/* 🏷️ Category Filter */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 🧩 Subcategory Filter */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={filters.subcategory}
              onChange={handleChange}
              disabled={!filters.category}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Subcategories</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* 💰 Price Filter */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (₹)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                onChange={handleChange}
                placeholder="From"
                className="w-1/2 border rounded-lg text-center p-2 text-sm focus:ring-2"
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

          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
          >
            Reset Filters
          </button>
        </aside>

        {/* Property Cards */}
        <main className="flex-1 p-4 sm:p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
            🏠 Available Properties
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 py-20">Loading properties...</p>
          ) : filteredProperties.length === 0 ? (
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
                  key={p._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden cursor-pointer group hover:-translate-y-1"
                  onClick={() => viewDetails(p)}
                >
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
                            alt=""
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

                    {/* ❤️ Favorite */}
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
                      onClick={(e) => prevSlide(p._id, e)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineLeft />
                    </button>
                    <button
                      onClick={(e) => nextSlide(p._id, e)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 opacity-0 group-hover:opacity-100"
                    >
                      <AiOutlineRight />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 truncate mb-1">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {p.address?.city || "—"}
                    </p>
                    <p className="text-lg font-semibold text-red-600">
                      ₹{p.price?.toLocaleString() || "N/A"}
                    </p>

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
