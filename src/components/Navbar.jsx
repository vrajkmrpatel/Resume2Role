// Importing necessary modules
import React, { useState } from "react";

const Navbar = () => {
      const [menuOpen, setMenuOpen] = useState(false);

      // Toggle menu open/close
      const toggleMenu = () => {
            setMenuOpen(!menuOpen);
      };

      return (
            <nav className="bg-blue-600 text-white p-4">
                  <div className="container mx-auto flex items-center justify-between">
                        {/* Logo or Brand Name */}
                        <div className="text-xl font-bold">Resume2Role</div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex space-x-6">
                              <a href="#" className="hover:underline">Home</a>
                              <a href="#upload" className="hover:underline">Upload Resume</a>
                              <a href="#" className="hover:underline">Recommendations</a>
                              <a href="#" className="hover:underline">Profile</a>
                              <a href="#" className="hover:underline">Help</a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                              className="md:hidden text-white focus:outline-none"
                              onClick={toggleMenu}
                        >
                              <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                              </svg>
                        </button>
                  </div>

                  {/* Mobile Menu */}
                  {menuOpen && (
                        <div className="md:hidden mt-4 space-y-2">
                              <a href="#" className="block hover:underline">Home</a>
                              <a href="#" className="block hover:underline">Upload Resume</a>
                              <a href="#" className="block hover:underline">Recommendations</a>
                              <a href="#" className="block hover:underline">Profile</a>
                              <a href="#" className="block hover:underline">Help</a>
                        </div>
                  )}
            </nav>
      );
};

export default Navbar;
