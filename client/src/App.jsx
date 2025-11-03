import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/Components/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import PropertyPage from "./Pages/PropertyList/PropertyList.jsx"; 
import PropertyDetails from "./Pages/Property Details/PropertyDetails.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import About from "./Pages/About/About.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import SampleAgreement from "./Components/SampleAgreement/SampleAgreement.jsx"; // ✅ Added import

function App() {
  return (
    <Router>
      {/* Common Navbar */}
      <Navbar />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/properties" element={<PropertyPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sample-agreement" element={<SampleAgreement />} /> {/* ✅ Added Route */}
      </Routes>

      {/* Common Footer */}
      <Footer />
    </Router>
  );
}

export default App;
