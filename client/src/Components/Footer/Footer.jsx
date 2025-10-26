import React from "react";
import { 
  AiOutlineMail, 
  AiOutlinePhone, 
  AiOutlineFacebook, 
  AiOutlineTwitter, 
  AiOutlineInstagram, 
  AiOutlineLinkedin,
  AiOutlineEnvironment
} from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = {
    "Buy": ["Apartments", "Villas", "Plots", "Commercial"],
    "Rent": ["Studio", "Family Homes", "Short Term", "Commercial"],
    "Company": ["About Us", "Careers", "Blog", "Press"],
    "Support": ["Help Center", "Contact", "Privacy", "Terms"]
  };

  const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai"];

  const socialLinks = [
    { icon: <AiOutlineFacebook />, name: "Facebook", url: "#" },
    { icon: <AiOutlineTwitter />, name: "Twitter", url: "#" },
    { icon: <AiOutlineInstagram />, name: "Instagram", url: "#" },
    { icon: <AiOutlineLinkedin />, name: "LinkedIn", url: "#" }
  ];

  return (
    <footer className="bg-gradient-to-tr from-[#1a1a2e] to-[#16213e] text-white ">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12">

          {/* Brand & Contact */}
          <div className="space-y-6">
            <div className="text-2xl font-bold">
              <span className="text-red-600">deal</span>
              <span className="text-blue-800">direct</span>
              <sup className="text-red-600 text-sm ml-1">™</sup>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for direct property deals without brokerage fees.
            </p>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-center gap-2"><AiOutlineMail className="text-red-600" /> hello@dealdirect.com</div>
              <div className="flex items-center gap-2"><AiOutlinePhone className="text-red-600" /> +91 1800-123-4567</div>
              <div className="flex items-center gap-2"><AiOutlineEnvironment className="text-red-600" /> Mumbai, India</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(quickLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-4">{category}</h4>
                <div className="flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <a key={idx} href="#" className="text-gray-400 text-sm hover:text-red-600 transition">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cities & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-white mb-4">Popular Cities</h4>
              <div className="flex flex-wrap gap-2">
                {cities.map((city, idx) => (
                  <a key={idx} href="#" className="text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10 hover:bg-red-600 hover:text-white transition">{city}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button className="bg-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; {currentYear} DealDirect. All rights reserved.</p>
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => (
              <a key={idx} href={social.url} className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 hover:bg-red-600 hover:shadow-lg transition">
                {social.icon}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/privacy" className="hover:text-red-600 transition">Privacy</a>
            <a href="/terms" className="hover:text-red-600 transition">Terms</a>
            <a href="/cookies" className="hover:text-red-600 transition">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
