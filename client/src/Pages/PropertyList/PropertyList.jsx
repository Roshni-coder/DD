import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const PropertyPage = () => {
  const [mode, setMode] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
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
      amenities: ["Gym", "Lift"],
      type: "Apartment",
      location: "Rohini, Delhi",
      image:
        "https://wallpapers.com/images/hd/real-estate-tropical-mansion-20c9os156eqcqd4j.jpg",
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
      amenities: ["Garden", "Swimming Pool"],
      type: "Villa",
      location: "Whitefield, Bangalore",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
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
      amenities: ["Lift"],
      type: "Studio",
      location: "Andheri, Mumbai",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
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
      amenities: ["Gym", "Swimming Pool", "Garden"],
      type: "Penthouse",
      location: "Baner, Pune",
      image:
        "https://ap.rdcpix.com/e391eb4cdcaae55b22e30baf5f740e4bl-b1492142831od-w480_h360_x2.jpg",
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
      amenities: ["Lift", "Gym"],
      type: "Apartment",
      location: "Gachibowli, Hyderabad",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
  ]);

  // 🧠 Filtering Logic
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

    // 🕵️ Search filter by location, type, or title
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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="min-h-screen !bg-gray-50 flex flex-col">
      {/* 🔍 Search Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 bg-white rounded-full shadow-lg px-4 py-3">
          <AiOutlineSearch className="text-gray-500 text-2xl ml-2" />
          <input
            type="text"
            placeholder="Search by city, locality, or property type..."
            className="flex-1 text-gray-700 outline-none px-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setMode("buy")}
              className={`px-12 py-2 rounded-full font-semibold ${
                mode === "buy"
                  ? "!bg-red-600 text-white"
                  : "bg-gray-100 text-red-600 hover:bg-red-50"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setMode("rent")}
              className={`px-12 py-2 rounded-full font-semibold ${
                mode === "rent"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-blue-700 hover:bg-blue-50"
              }`}
            >
              Rent
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row w-[95%]  gap-5 !m-auto flex-grow">
        {/* 🧩 Left Filter Section */}
        <aside className="md:w-1/4 bg-white p-6 shadow-md border-r rounded-sm border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800  pb-2">
            Filters
          </h2>

          {/* 💰 Price Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {mode === "buy" ? "Price Range (₹)" : "Rent Range (₹/month)"}
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="priceFrom"
                value={filters.priceFrom}
                onChange={handleChange}
                placeholder="From"
                className="w-1/2 mt-2 border-gray-300 text-center p-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                name="priceTo"
                value={filters.priceTo}
                onChange={handleChange}
                placeholder="To"
                className="w-1/2 mt-2 border-gray-300 rounded p-1 text-center shadow-sm focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* 🏠 BHK */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BHK
            </label>
            <select
              name="bhk"
              value={filters.bhk}
              onChange={handleChange}
              className="w-full border-gray-300 rounded p-1 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4+ BHK</option>
            </select>
          </div>

          {/* 🚿 Bathrooms */}
          <div className="mb-4">
            <label className="block  text-sm font-medium text-gray-700 mb-1">
              Bathrooms
            </label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
              className="w-full border-gray-300 p-1 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          {/* 🪑 Furnishing */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Furnishing
            </label>
            <select
              name="furnishing"
              value={filters.furnishing}
              onChange={handleChange}
              className="w-full p-1 border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Furnished">Furnished</option>
            </select>
          </div>

          {/* 🅿️ Parking */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking
            </label>
            <select
              name="parking"
              value={filters.parking}
              onChange={handleChange}
              className="w-full border-gray-300 p-1 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All</option>
              <option value="Yes">Available</option>
              <option value="No">Not Available</option>
            </select>
          </div>

          {/* 🏊 Amenities */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amenities
            </label>
            <select
              name="amenities"
              value={filters.amenities}
              onChange={handleChange}
              className="w-full p-1 border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All</option>
              <option value="Gym">Gym</option>
              <option value="Lift">Lift</option>
              <option value="Garden">Garden</option>
              <option value="Swimming Pool">Swimming Pool</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="w-full bg-red-500  text-white py-2 rounded-full hover:opacity-90 transition"
          >
            Reset Filters
          </button>
        </aside>

        {/* 🏘 Property List */}
        {/* 🏘 Property List */}
        <main className="flex-1 p-6 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {mode === "buy"
              ? "🏠 Properties for Sale"
              : "🏢 Properties for Rent"}
          </h2>

          {filteredProperties.length === 0 ? (
            <p className="text-gray-500 text-center mt-12">
              No properties match your filters 😔
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{p.location}</p>

                    <p
                      className={`mt-2 text-lg font-bold ${
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

                    <p className="text-sm text-gray-500 mt-1">
                      {p.bhk} BHK • {p.bathrooms} Bath • {p.furnishing}
                    </p>

                    <button className="mt-4 w-full py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
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
