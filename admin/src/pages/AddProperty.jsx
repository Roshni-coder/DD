import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Home,
  MapPin,
  Upload,
  Building2,
  User,
  CheckCircle,
  ListChecks,
} from "lucide-react";


// ✅ Environment variable for backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    priceUnit: "Lac",
    emi: "",
    area: { totalSqft: "", carpetSqft: "", pricePerSqft: "" },
    bhkType: "",
    bathrooms: "",
    balcony: "",
    parking: { covered: "", open: "" },
    transactionType: "Resale",
    status: "Ready to Move",
    facing: "",
    lifts: "",
    furnishedStatus: "",
    typeOfOwnership: "",
    ageOfConstruction: "",
    bookingAmount: "",
    monthlyMaintenance: "",
    address: {
      line: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmarks: "",
    },
    flooring: [],
    description: "",
    contact: { name: "", phone: "" },
    category: "",
    subcategory: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // 🔹 Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/categories/list`);
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Fetch Subcategories when Category Changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.category) return;
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/subcategories/byCategory/${formData.category}`
        );
        setSubcategories(res.data);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };
    fetchSubcategories();
  }, [formData.category]);

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Nested Object Changes
  const handleNestedChange = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // 🔹 Handle Flooring (comma separated)
  const handleFlooring = (e) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setFormData((prev) => ({ ...prev, flooring: values }));
  };

  // 🔹 Handle Image Upload
  const handleImageChange = (e) => setImages([...e.target.files]);

  // 🔹 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (["area", "parking", "address", "contact"].includes(key)) {
          data.append(key, JSON.stringify(formData[key]));
        } else if (key === "flooring") {
          data.append("flooring", JSON.stringify(formData.flooring));
        } else {
          data.append(key, formData[key]);
        }
      });
      images.forEach((img) => data.append("images", img));

      const adminToken = localStorage.getItem("adminToken");

      await axios.post(`${API_BASE_URL}/api/properties/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: adminToken ? `Bearer ${adminToken}` : "",
        },
      });

      toast.success("✅ Property added successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "❌ Failed to add property"
      );
    }
  };

  // 🔹 Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      priceUnit: "Lac",
      emi: "",
      area: { totalSqft: "", carpetSqft: "", pricePerSqft: "" },
      bhkType: "",
      bathrooms: "",
      balcony: "",
      parking: { covered: "", open: "" },
      transactionType: "Resale",
      status: "Ready to Move",
      facing: "",
      lifts: "",
      furnishedStatus: "",
      typeOfOwnership: "",
      ageOfConstruction: "",
      bookingAmount: "",
      monthlyMaintenance: "",
      address: {
        line: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        landmarks: "",
      },
      flooring: [],
      description: "",
      contact: { name: "", phone: "" },
      category: "",
      subcategory: "",
    });
    setImages([]);
    setSubcategories([]);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-10 mt-4 rounded-2xl shadow-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-8 border-b pb-4">
        <Building2 className="text-blue-600 h-7 w-7" />
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Add New Property
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Category & Subcategory */}
       <Section
  title="Category & Subcategory"
  icon={<ListChecks className="h-5 w-5 text-blue-600" />}
>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Section>

        {/* Property Details */}
        <Section title="Property Details" icon={<Home className="h-5 w-5 text-blue-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input name="title" label="Property Title" value={formData.title} onChange={handleChange} />
            <Input name="price" label="Price (in Lac)" value={formData.price} onChange={handleChange} />
            <Input name="emi" label="EMI (Optional)" value={formData.emi} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
            <NestedInput section="area" keyName="totalSqft" label="Total Sqft" value={formData.area.totalSqft} onChange={handleNestedChange} />
            <NestedInput section="area" keyName="carpetSqft" label="Carpet Sqft" value={formData.area.carpetSqft} onChange={handleNestedChange} />
            <NestedInput section="area" keyName="pricePerSqft" label="Price/Sqft" value={formData.area.pricePerSqft} onChange={handleNestedChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3">
            <Input name="bhkType" label="BHK Type" value={formData.bhkType} onChange={handleChange} />
            <Input name="bathrooms" label="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
            <Input name="balcony" label="Balconies" value={formData.balcony} onChange={handleChange} />
          </div>
        </Section>

        {/* Specifications */}
        <Section title="Specifications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input name="transactionType" label="Transaction Type" value={formData.transactionType} onChange={handleChange} />
            <Input name="status" label="Status" value={formData.status} onChange={handleChange} />
            <Input name="facing" label="Facing" value={formData.facing} onChange={handleChange} />
            <Input name="lifts" label="Lifts" value={formData.lifts} onChange={handleChange} />
            <Input name="furnishedStatus" label="Furnished Status" value={formData.furnishedStatus} onChange={handleChange} />
            <Input name="typeOfOwnership" label="Ownership Type" value={formData.typeOfOwnership} onChange={handleChange} />
            <Input name="ageOfConstruction" label="Age of Construction" value={formData.ageOfConstruction} onChange={handleChange} />
            <Input name="bookingAmount" label="Booking Amount" value={formData.bookingAmount} onChange={handleChange} />
            <Input name="monthlyMaintenance" label="Monthly Maintenance" value={formData.monthlyMaintenance} onChange={handleChange} />
          </div>

          <Input name="flooring" label="Flooring (comma separated)" value={formData.flooring.join(", ")} onChange={handleFlooring} />
        </Section>

        {/* Address */}
        <Section title="Address" icon={<MapPin className="h-5 w-5 text-blue-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Object.keys(formData.address).map((key) => (
              <NestedInput
                key={key}
                section="address"
                keyName={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData.address[key]}
                onChange={handleNestedChange}
              />
            ))}
          </div>
        </Section>

        {/* Description */}
        <Section title="Description">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief description..."
            className="w-full border border-gray-300 rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-400"
          />
        </Section>

        {/* Contact */}
        <Section title="Contact" icon={<User className="h-5 w-5 text-blue-600" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NestedInput section="contact" keyName="name" label="Contact Name" value={formData.contact.name} onChange={handleNestedChange} />
            <NestedInput section="contact" keyName="phone" label="Phone Number" value={formData.contact.phone} onChange={handleNestedChange} />
          </div>
        </Section>

        {/* Images */}
        <Section title="Property Images" icon={<Upload className="h-5 w-5 text-blue-600" />}>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg p-2 hover:border-blue-400"
          />
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {Array.from(images).map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="h-24 w-24 object-cover rounded-lg border border-gray-300 hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          )}
        </Section>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <CheckCircle className="h-5 w-5" /> Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

/* 🔹 Reusable Components */
const Section = ({ title, icon, children }) => (
  <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl hover:shadow-md transition-all">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
    {children}
  </div>
);

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

const NestedInput = ({ section, keyName, label, value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(section, keyName, e.target.value)}
      placeholder={label}
      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default AddProperty;
