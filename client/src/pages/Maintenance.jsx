import React from "react";
import { Wrench, Clock } from "lucide-react";

const Maintenance = ({ message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-full animate-pulse">
                <Wrench className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Under Maintenance
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-300 text-center mb-8 leading-relaxed">
            {message ||
              "We are currently performing scheduled maintenance. We'll be back soon!"}
          </p>

          {/* Decorative Elements */}
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Clock className="w-5 h-5" />
            <p className="text-sm">Please check back in a few moments</p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Methsara Publications. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
