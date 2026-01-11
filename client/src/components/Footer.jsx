import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">M</span>
              </div>
              <span className="ml-2 text-lg font-bold text-white">
                Methsara Publications
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              Empowering Sri Lankan students with quality educational materials
              since 2012. Trusted by over 10,000 students nationwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/methsarabooks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm hover:text-white transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="text-sm hover:text-white transition-colors"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Kottawa, Sri Lanka</span>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>
                  <a
                    href="tel:0714325383"
                    className="hover:text-white transition-colors"
                  >
                    071 432 5383
                  </a>
                  {" / "}
                  <a
                    href="tel:0714485899"
                    className="hover:text-white transition-colors"
                  >
                    071 448 5899
                  </a>
                </span>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <a
                  href="mailto:methsarabooks@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  methsarabooks@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Methsara Publications. All rights
                reserved.
              </p>
              <span className="hidden md:inline text-gray-600">|</span>
              <p className="text-sm text-gray-400">
                Designed & Developed by{" "}
                <a
                  href="https://sarasitha.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
                >
                  Sarasitha Galagama
                </a>
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
