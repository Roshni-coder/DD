// src/Components/HeroSection/filterConfig.js

export const budgetOptions = [
  "₹ 5 Lakhs", "₹ 10 Lakhs", "₹ 15 Lakhs", "₹ 20 Lakhs", "₹ 25 Lakhs",
  "₹ 30 Lakhs", "₹ 40 Lakhs", "₹ 50 Lakhs", "₹ 60 Lakhs", "₹ 70 Lakhs",
  "₹ 80 Lakhs", "₹ 90 Lakhs", "₹ 1 Crore", "₹ 1.2 Crore", "₹ 1.4 Crore",
  "₹ 1.6 Crore", "₹ 1.8 Crore", "₹ 2 Crore", "₹ 2.5 Crore", "₹ 3 Crore",
  "₹ 3.5 Crore", "₹ 4 Crore", "₹ 4.5 Crore", "₹ 5 Crore", "₹ 10 Crore",
  "₹ 15 Crore", "₹ 20 Crore", "₹ 25 Crore", "₹ 30 Crore", "₹ 40 Crore",
  "₹ 50 Crore", "₹ 60 Crore", "₹ 75 Crore"
];

export const propertyTypes = {
  Residential: ["Apartment", "Plot", "Builder Floor", "Villa", "Penthouse", "Independent House"],
  Commercial: ["Office Space", "Shop", "Showroom", "Warehouse", "Commercial Land"]
};

export const projectPropertyTypes = {
  Residential: ["Apartment", "Studio", "Plot", "Villa", "Row House", "Penthouse", "Ind Floor"],
  Commercial: ["Retail Shop", "Office Space", "Commercial Plots"]
};

export const possessionStatuses = ["Ready To Move", "Under Construction"];

export const furnishingStatuses = ["Furnished", "Semi-Furnished", "Unfurnished", "Gated Communities"];

export const commercialPropertyTypes = [
  "Office Space",
  "Shop",
  "Showroom",
  "Office Space in IT/SEZ",
  "Land",
  "Industrial Plot",
  "Warehouse"
];

export const tabConfig = {
  "Buy": {
    filters: ["budget", "propertyType", "possession"],
    searchPlaceholder: "Search by Project, Locality, or Builder"
  },
  "Rental": {
    filters: ["budget", "propertyType", "furnishing"],
    searchPlaceholder: "Search by Project, Locality, or Builder"
  },
  "Projects": {
    filters: ["budget", "projectPropertyType"],
    searchPlaceholder: "Search by Project, Locality, or Builder"
  },
  "PG / Hostels": {
    filters: ["budget", "availableFor"],
    searchPlaceholder: "Search by Locality or Area"
  },
  "Plot & Land": {
    filters: ["budget", "postedBy"],
    searchPlaceholder: "Search by Locality or Builder"
  },
  "Commercial": {
    filters: ["transactionType", "budget", "commercialPropertyType"],
    searchPlaceholder: "Search by Project, Locality, or Builder"
  },
  "Agents": {
    filters: ["agentFor"],
    searchPlaceholder: "Search by Locality or Agent Name"
  }
};
