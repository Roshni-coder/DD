import React from "react";
import { FaDownload, FaFilePdf, FaShieldAlt, FaCheckCircle, FaLock, FaUserCheck, FaCertificate } from "react-icons/fa";

function SampleAgreement() {
  const agreements = [
    {
      title: "1 BHK Rent Agreement",
      file: "/agreements/1bhk.pdf",
      description:
        "A legally verified rental agreement template tailored for 1 BHK properties. Secure and ready to use.",
    },
    {
      title: "2 BHK Rent Agreement",
      file: "/agreements/2bhk.pdf",
      description:
        "A comprehensive 2 BHK rent agreement format with verified clauses to ensure transparency and protection.",
    },
    {
      title: "3 BHK Rent Agreement",
      file: "/agreements/3bhk.pdf",
      description:
        "A trusted 3 BHK rent agreement suitable for families or shared tenants — professional and reliable.",
    },
  ];

  const trustFeatures = [
    { icon: FaCertificate, text: "Legally Verified", subtext: "All documents comply with rental laws" },
    { icon: FaLock, text: "Secure & Protected", subtext: "Your data and privacy are safeguarded" },
    { icon: FaUserCheck, text: "Trusted by Thousands", subtext: "Used by property owners nationwide" },
    { icon: FaCheckCircle, text: "Professionally Drafted", subtext: "Created by legal experts" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 py-16 px-6 lg:px-20">
      {/* Trust Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <FaShieldAlt className="relative text-blue-600 text-5xl z-10" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Verified Rent Agreements
        </h1>
        
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          Professionally crafted, legally compliant rental agreements trusted by property owners and tenants nationwide. 
          Every document is meticulously verified for your peace of mind.
        </p>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          {trustFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <feature.icon className="text-blue-500 text-2xl mb-3" />
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.text}</h3>
                <p className="text-gray-600 text-xs">{feature.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agreement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {agreements.map((agreement, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative overflow-hidden"
          >
            {/* Trust Badge */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <FaCheckCircle className="text-white" />
              Verified
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-blue-500 to-indigo-500"></div>
            
            <div className="relative z-10">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-red-100 rounded-full blur-md opacity-50"></div>
                <FaFilePdf className="relative text-red-500 text-6xl z-10" />
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {agreement.title}
              </h2>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {agreement.description}
              </p>

              <div className="flex gap-3 w-full">
                {/* View Button */}
                <a
                  href={agreement.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md"
                >
                  <FaFilePdf className="text-white" />
                  <span>Preview</span>
                </a>

                {/* Download Button */}
                <a
                  href={agreement.file}
                  download
                  className="flex-1 bg-white text-gray-700 px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-200 hover:border-gray-300"
                >
                  <FaDownload className="text-gray-600" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Footer */}
      <div className="mt-20 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-sm border border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaLock className="text-green-500 text-xl" />
            <span className="text-sm font-semibold text-green-600">SECURE & TRUSTED</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Your Trust is Our Priority
          </h3>
          
          <p className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto">
            Every agreement is meticulously crafted by legal professionals and regularly updated to comply with 
            current rental laws. We maintain the highest standards of quality and reliability to protect both 
            property owners and tenants.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" />
              <span>100% Legal Compliance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" />
              <span>Regularly Updated</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCheckCircle className="text-green-500" />
              <span>Professional Quality</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mt-8 max-w-2xl mx-auto">
          ⚖️ All agreements provided here are professionally drafted templates. 
          We recommend consulting with a certified legal advisor for specific legal advice.
        </p>
      </div>
    </div>
  );
}

export default SampleAgreement;