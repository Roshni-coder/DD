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

// 📋 Get All Properties with Populated Category & SubCategory
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("category", "name description")
      .populate("subcategory", "name description category")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🏠 Get Property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("category", "name description")
      .populate("subcategory", "name description category");
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
      return res.status(404).json({ success: false, message: "Property not found" });

    if (req.files?.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      property.images.push(...newImages);
    }

    Object.assign(property, req.body);
    await property.save();
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🗑️ Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property)
      return res.status(404).json({ success: false, message: "Property not found" });
    res.json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
