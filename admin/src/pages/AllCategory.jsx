import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, PlusCircle, X } from "lucide-react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null); // for category or subcategory edit
  const [isEditing, setIsEditing] = useState(false);

  // 🧠 Fetch categories + subcategories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data: catRes } = await axios.get(`${API_URL}/api/categories/list`);
      const { data: subRes } = await axios.get(`${API_URL}/api/subcategories/list`);

      const merged = catRes.map((cat) => ({
        ...cat,
        subcategories: subRes.filter((s) => s.category?._id === cat._id),
      }));

      setCategories(merged);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🗑️ Delete function
  const handleDelete = async (id, type = "category") => {
  if (!window.confirm(`Delete this ${type}?`)) return;

  const token = localStorage.getItem("adminToken");

  try {
    await axios.delete(
      `${API_URL}/api/${type === "category" ? "categories" : "subcategories"}/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(`${type} deleted successfully`);
    fetchCategories();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete");
  }
};


  // ✏️ Open edit modal
  const handleEdit = (item, type = "category") => {
    setEditData({ ...item, type });
    setIsEditing(true);
  };

  // 💾 Save updated category or subcategory
  const handleSaveEdit = async () => {
  const token = localStorage.getItem("adminToken");

  try {
    const endpoint =
      editData.type === "category"
        ? `${API_URL}/api/categories/edit/${editData._id}`
        : `${API_URL}/api/subcategories/edit/${editData._id}`;

    const payload =
      editData.type === "category"
        ? { name: editData.name }
        : { name: editData.name, category: editData.category?._id || editData.category };

    await axios.put(endpoint, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success(`${editData.type} updated successfully`);
    setIsEditing(false);
    setEditData(null);
    fetchCategories();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to update");
  }
};

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-semibold text-gray-800">📂 All Categories</h2>
        <button
          onClick={() => toast.info("Navigate to Add Category Page")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="grid gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                  <p className="text-sm text-gray-500">
                    {cat.subcategories?.length || 0} Subcategories
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(cat, "category")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(cat._id, "category")}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {cat.subcategories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub._id}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {sub.name}
                      <div className="flex gap-1">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleEdit(sub, "subcategory")}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDelete(sub._id, "subcategory")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Edit Modal */}
{isEditing && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative border border-gray-100">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        onClick={() => setIsEditing(false)}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        ✏️ Edit {editData.type === "category" ? "Category" : "Subcategory"}
      </h3>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Update the name and save changes.
      </p>

      {/* Input Field */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600 font-medium">
          {editData.type === "category" ? "Category Name" : "Subcategory Name"}
        </label>
        <input
          type="text"
          value={editData.name}
          onChange={(e) =>
            setEditData({ ...editData, name: e.target.value })
          }
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter new name"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AllCategory;
