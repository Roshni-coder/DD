import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9000";

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/properties/list`);
      if (res.data.success) {
        setProperties(res.data.data);
      } else {
        toast.error("Failed to fetch properties");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // 🗑️ Delete Property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`${API_URL}/api/properties/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      toast.success("Property deleted successfully");
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting property");
    }
  };

  // ✏️ Edit Property
  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">All Properties</h2>
        <button
          onClick={() => navigate("/admin/add-property")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Property
        </button>
      </div>

      <div className="bg-white rounded shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Subcategory</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-500">
                  Loading properties...
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5 text-gray-500">
                  No properties found
                </td>
              </tr>
            ) : (
              properties.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={
                        item.images?.length
                          ? `http://localhost:9000${item.images[0]}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.title}
                      className="w-16 h-14 rounded-md object-cover border"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {item.title}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {item.category?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {item.subcategory?.name || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.address?.city || item.address?.area || "-"}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    ₹{item.price} {item.priceUnit}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Edit className="inline w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="inline w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProperty;
