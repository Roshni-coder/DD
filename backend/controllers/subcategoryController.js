import SubCategory from "../models/SubCategory.js";

// ➕ Create SubCategory
export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const exists = await SubCategory.findOne({ name, category });
    if (exists)
      return res.status(400).json({ message: "Subcategory already exists for this category" });

    const sub = await SubCategory.create({ name, category });
    res.status(201).json({
      message: "Subcategory created successfully",
      sub,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📋 Get All SubCategories
export const getSubCategories = async (req, res) => {
  try {
    const subs = await SubCategory.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete SubCategory
export const deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Subcategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update SubCategory
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    const subcategory = await SubCategory.findById(id);
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });

    // Update fields if provided
    subcategory.name = name || subcategory.name;
    subcategory.category = category || subcategory.category;

    const updatedSubCategory = await subcategory.save();

    res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory: updatedSubCategory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId || categoryId.length !== 24) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const subcategories = await SubCategory.find({ category: categoryId });

    res.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
