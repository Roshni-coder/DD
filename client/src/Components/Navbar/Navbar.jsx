import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/dealdirect_logo.webp";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "Properties",
    "About",
    "Sample Agreement",
    "Contact",
  ];

  return (
    <nav
      className={`fixed
         top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white/80 backdrop-blur-sm shadow-sm py-4"
      }`}
    >
      <div className=" mx-auto flex items-center py-3 justify-between px-4 sm:px-6 lg:px-10">
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="DealDirect"
            className="h-9 sm:h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
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

        {/* ✅ Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-5 lg:space-x-7">
          <Link
            to="/login"
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-700 transition"
          >
            <AiOutlineUser className="text-xl sm:text-2xl" />
            <span className="font-medium hidden sm:block">Login</span>
          </Link>

          <Link
            to="/properties"
            className="hidden sm:block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 sm:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            List Property
          </Link>

          {/* ✅ Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl text-gray-700 hover:text-blue-700 focus:outline-none"
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      <div
        className={`lg:hidden absolute left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        <div className="flex flex-col px-6 py-5 space-y-5 text-center">
          {navItems.map((item) => (
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
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-all duration-300"
          >
            List Property
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
