import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github, 
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const useScrollToTopNavigation = () => {
  const navigate = useNavigate();

  const navigateAndScrollTop = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return navigateAndScrollTop;
};

const Footer = () => {
  const navigateAndScrollTop = useScrollToTopNavigation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const QuickLinks = ["Home", "About", "For You", "Profile"];
  const SocialIcons = [
    { icon: Facebook, link: "#" },
    { icon: Github, link: "https://github.com/Nitin-kanzariya" },
    { icon: Instagram, link: "#" },
    {
      icon: Linkedin,
      link: "https://www.linkedin.com/in/nitin-kanzariya-7956b3264/",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Logo and Description Section */}
          <div className="space-y-6">
            <div
              onClick={() => navigateAndScrollTop("/")}
              className="inline-block group cursor-pointer"
            >
              <span className="text-4xl font-bold text-white">Movie</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                Stream
              </span>
            </div>
            <p className="text-base text-gray-300 max-w-xs leading-relaxed">
              Your ultimate destination for streaming movies and TV shows. Watch
              anywhere, anytime.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="space-y-4">
              {QuickLinks.map((link) => (
                <li key={link}>
                  <div
                    onClick={() =>
                      navigateAndScrollTop(
                        link === "Home"
                          ? "/"
                          : link === "For You"
                          ? "/movies"
                          : `/${link.toLowerCase()}`
                      )
                    }
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-base flex items-center group cursor-pointer"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 text-base flex items-center space-x-3 group">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="group-hover:text-blue-400 transition-colors duration-300">
                  DA-IICT, Gandhinagar, India
                </span>
              </li>
              <li className="text-gray-400 text-base flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="group-hover:text-blue-400 transition-colors duration-300">
                  support@moviestream.com
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-base"
                >
                  +123 456 7890
                </a>
              </li>
            </ul>
            <div className="flex space-x-5 mt-8">
              {SocialIcons.map(({ icon: Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:-translate-y-1"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Gradient Border */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} MovieStream. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;
