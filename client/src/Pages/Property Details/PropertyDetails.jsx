import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

const API_BASE = "http://localhost:9000";

const PropertyDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [property, setProperty] = useState(state?.property || null);
  const [loading, setLoading] = useState(!state?.property);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (property) return;
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/properties/${id}`);
        setProperty(res.data.data);
      } catch (err) {
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const normalizeImages = (imgs = []) =>
    imgs.map((img) =>
      img && img.startsWith("/uploads") ? `${API_BASE}${img}` : img
    );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading property details...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  if (!property)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Property not found
      </div>
    );

  const imgs = normalizeImages(property.images || []);
  const price = property.price || property.buyPrice || 0;
  const formattedPrice = price.toLocaleString();
  const whatsappNumber = property.contact?.phone
    ? `91${property.contact.phone.replace(/\D/g, "")}`
    : "919876543210";
  const message = `Hi, I'm interested in "${property.title}" located in ${
    property.address?.city || ""
  }. Please share more details.`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 mt-20">
      {/* ---- Images Section ---- */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={imgs[activeImage] || property.image || ""}
              alt={property.title}
              className="w-full h-96 object-cover"
            />

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
              >
                {isFavorite ? (
                  <HeartIconSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Property link copied!");
                }}
                className="bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
              >
                <ShareIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {activeImage + 1} / {imgs.length || 1}
            </div>
          </div>

          {/* Thumbnails */}
          {imgs.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {imgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-full object-cover rounded-xl cursor-pointer border-2 ${
                    i === activeImage
                      ? "border-red-500 scale-105"
                      : "border-transparent hover:border-red-300"
                  } transition-all`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---- Property Info ---- */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <p className="flex items-center text-gray-600 mb-4">
            <MapPinIcon className="w-5 h-5 mr-1 text-red-500" />
            {property.address?.city}, {property.address?.state}
          </p>

          <p className="text-4xl font-semibold text-red-600 mb-6">
            ₹{formattedPrice}
          </p>

          {/* Property Info Grid */}
          <div className="grid grid-cols-2 gap-y-3 text-gray-700 bg-gray-50 p-5 rounded-2xl mb-6">
            {property.category && (
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {property.category.name}
              </p>
            )}
            {property.subcategory && (
              <p>
                <span className="font-semibold">Subcategory:</span>{" "}
                {property.subcategory.name}
              </p>
            )}
            {property.area?.totalSqft && (
              <p>
                <span className="font-semibold">Total Area:</span>{" "}
                {property.area.totalSqft} sq.ft
              </p>
            )}
            {property.area?.pricePerSqft && (
              <p>
                <span className="font-semibold">Price/Sqft:</span> ₹
                {property.area.pricePerSqft}
              </p>
            )}
            {property.parking && (
              <p>
                <span className="font-semibold">Parking:</span>{" "}
                {property.parking.available
                  ? `${property.parking.type || "Available"}`
                  : "Not Available"}
              </p>
            )}
            {property.contact?.name && (
              <p>
                <span className="font-semibold">Owner:</span>{" "}
                {property.contact.name}
              </p>
            )}
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                message
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
            >
              <ChatBubbleLeftIcon className="w-6 h-6" /> WhatsApp Owner
            </a>
            <a
              href={`tel:${property.contact?.phone || ""}`}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
            >
              <PhoneIcon className="w-6 h-6" /> Call Owner
            </a>
          </div>
        </div>
      </div>

      {/* ---- Description ---- */}
      <div className="bg-white mt-12 p-8 rounded-3xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
          <BuildingStorefrontIcon className="w-7 h-7" /> Property Overview
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {property.description || "No description provided."}
        </p>
      </div>

      {/* ---- Map ---- */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
          <MapPinIcon className="w-7 h-7" /> Location
        </h2>
        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.address?.area ||
                property.address?.city ||
                property.title
            )}&output=embed`}
            title="Map"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
