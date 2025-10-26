import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import heroImg from "../../assets/Villa.jpg"; // 🏠 Add your image path

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* 🌇 Hero Section */}
      <section className="relative h-[70vh] text-white flex items-center justify-center text-center overflow-hidden">
        <img
          src={heroImg}
          alt="About DealDirect"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-blue-900/40"></div>

        <div className="relative px-6 max-w-3xl space-y-6">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            <AiOutlineCheckCircle className="mr-2 text-red-400" />
            No Brokerage • Verified Listings
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            About <span className="text-red-400">Deal</span>
            <span className="text-blue-300">Direct</span>
          </h1>

          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            DealDirect connects property buyers, sellers, and renters directly — removing
            brokers, reducing costs, and ensuring every deal is transparent and fair.
          </p>
        </div>
      </section>

      {/* 🎯 Mission Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At <span className="text-red-500 font-semibold">DealDirect</span>, our mission is to
              empower individuals to buy, sell, or rent properties without intermediaries. We
              believe real estate should be
              <span className="text-blue-600 font-semibold"> simple, direct, </span>
              and trustworthy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By combining technology with transparency, we’re building a future where property
              transactions happen with confidence, convenience, and connection.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            alt="Modern apartment"
            className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* 📊 Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { number: "50K+", label: "Active Listings" },
            { number: "30K+", label: "Verified Users" },
            { number: "120+", label: "Cities Covered" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-2xl py-8 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl font-bold text-blue-700">{stat.number}</div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 📖 Story Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80"
            alt="Real estate team"
            className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500 order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The idea for <span className="text-red-500 font-semibold">DealDirect</span> was born
              from a simple question — why should property buyers and sellers pay huge commissions
              for something that can be done directly?
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our founders saw an opportunity to make real estate more
              <span className="text-blue-600 font-semibold"> transparent and affordable.</span>
              With cutting-edge tools, verified listings, and trusted user connections, we’re making
              property deals easier than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* 👁️ Vision Section */}
      <section className="bg-gradient-to-r from-blue-50 to-red-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            To become India’s most trusted property platform — where every
            <span className="text-red-500 font-semibold"> home buyer </span>,
            <span className="text-blue-600 font-semibold"> seller, </span> and
            <span className="text-blue-900 font-semibold"> builder </span> can connect seamlessly,
            confidently, and directly.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-red-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Explore Properties
            </button>
            <button className="border-2 border-blue-600 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition">
              List Your Property
            </button>
          </div>
        </div>
      </section>

      {/* 👥 Team Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-3">Meet the Team</h2>
        <p className="text-gray-600 mb-10">The innovators driving DealDirect forward</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "Roshni Bhoi", role: "Founder & CEO", emoji: "👩‍💼" },
            { name: "Rahul Sharma", role: "CTO", emoji: "💻" },
            { name: "Priya Patel", role: "Head of Marketing", emoji: "📣" },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{member.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <div className="text-blue-600 font-medium">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-blue-700 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">Start Your Property Journey Today</h2>
        <p className="mb-8 text-lg">
          Join thousands who have found their dream property through DealDirect
        </p>
        <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </div>
  );
}
