import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    price: { type: Number, required: true },
    priceUnit: { type: String, default: "Lac" },
    emi: String,
    area: {
      totalSqft: Number,
      carpetSqft: Number,
      pricePerSqft: Number,
    },
    bhkType: String,
    bathrooms: Number,
    balcony: Number,
    parking: { covered: Number, open: Number },
    transactionType: String,
    status: String,
    facing: String,
    lifts: Number,
    furnishedStatus: String,
    typeOfOwnership: String,
    ageOfConstruction: String,
    bookingAmount: Number,
    monthlyMaintenance: Number,
    address: {
      line: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      landmarks: String,
    },
    flooring: [String],
    description: String,
    images: [String],
    contact: {
      name: String,
      phone: String,
    },
    // ✅ Admin Approval
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
