import Property from "../models/Property.js";

// ➕ Add Property
export const addProperty = async (req, res) => {
  try {
    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const parsedData = {
      ...req.body,
      area: JSON.parse(req.body.area || "{}"),
      parking: JSON.parse(req.body.parking || "{}"),
      address: JSON.parse(req.body.address || "{}"),
      contact: JSON.parse(req.body.contact || "{}"),
      flooring: JSON.parse(req.body.flooring || "[]"),
    };

    const newProperty = new Property({
      ...parsedData,
      images,
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: newProperty,
    });
  } catch (error) {
    console.error("Error in addProperty:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add property",
    });
  }
};

// 📋 Get All Properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// 🏠 Get Property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });

    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update Property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });

    // Handle image uploads
    if (req.files?.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      property.images.push(...newImages);
    }

    // Parse nested JSON fields if needed
    const updatedData = {
      ...req.body,
      area: req.body.area ? JSON.parse(req.body.area) : property.area,
      parking: req.body.parking ? JSON.parse(req.body.parking) : property.parking,
      address: req.body.address ? JSON.parse(req.body.address) : property.address,
      contact: req.body.contact ? JSON.parse(req.body.contact) : property.contact,
      flooring: req.body.flooring ? JSON.parse(req.body.flooring) : property.flooring,
    };

    Object.assign(property, updatedData);
    await property.save();

    res.json({ success: true, message: "Property updated successfully", data: property });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🗑️ Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });

    res.json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
