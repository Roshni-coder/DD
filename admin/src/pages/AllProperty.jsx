import React, { useEffect, useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch properties from backend
  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/properties/list");
      if (res.data.success) {
        setProperties(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ✅ Delete property handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`http://localhost:9000/api/properties/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, // only if protected route
        },
      });
      toast.success("Property deleted successfully");
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Error deleting property");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-[600] pl-1 text-gray-800">
          All Properties
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add Property
        </button>
      </div>

      <div className="bg-white rounded shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 font-medium">Image</th>
              <th className="py-3 px-4 font-medium">Title</th>
              <th className="py-3 px-4 font-medium">Location</th>
              <th className="py-3 px-4 font-medium">Price</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  Loading properties...
                </td>
              </tr>
            ) : properties.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No properties found
                </td>
              </tr>
            ) : (
              properties.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={
                        item.images && item.images.length > 0
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
                  <td className="py-3 px-4 text-gray-600">
                    {item.address?.city || item.address?.area || "-"}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-semibold">
                    ₹{item.price} {item.priceUnit}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Eye className="inline w-5 h-5" />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
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
