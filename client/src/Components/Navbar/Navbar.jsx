import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/dealdirect_logo.webp";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-8 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="DealDirect"
            className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Properties", "About", "Sample Agreement", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
              className="relative text-gray-700 font-medium hover:text-blue-700 transition duration-300 group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-7">
          <Link
            to="/login"
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 transition"
          >
            <AiOutlineUser className="text-lg" />
            <span className="font-medium hidden sm:block">Login</span>
          </Link>
          <Link
            to="/properties"
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            List Property
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-gray-700 hover:text-blue-700"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {["Home", "Properties", "About", "Sample Agreement", "Contact"].map((item) => (
            <Link
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={toggleMenu}
              className="text-gray-700 font-medium hover:text-blue-700 transition"
            >
              {item}
            </Link>
          ))}
          <Link
            to="/properties"
            onClick={toggleMenu}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full text-center text-sm font-semibold hover:scale-105 transition-all duration-300"
          >
            List Property
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
