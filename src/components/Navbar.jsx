import React, { useState, useEffect } from "react";

const Navbar = () => {
      const [menuOpen, setMenuOpen] = useState(false);
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  setScrolled(window.scrollY > 20);
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      const toggleMenu = () => {
            setMenuOpen(!menuOpen);
      };

      const closeMenuAndScroll = (id) => {
            setMenuOpen(false);
            const section = document.querySelector(id);
            if (section) {
                  section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                  });
            }
      };

      return (
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                        ? 'glass shadow-lg'
                        : 'bg-white/70 backdrop-blur-md'
                  }`}>
                  <div className="container mx-auto px-4 md:px-6 py-4">
                        <div className="flex items-center justify-between">
                              {/* Logo/Brand with Gradient */}
                              <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center shadow-glow">
                                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                          </svg>
                                    </div>
                                    <span className="text-xl md:text-2xl font-heading font-bold text-gradient">
                                          Resume2Role
                                    </span>
                              </div>

                              {/* Desktop Links */}
                              <div className="hidden md:flex items-center space-x-1">
                                    <button
                                          onClick={() => closeMenuAndScroll("#home")}
                                          className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                                    >
                                          Home
                                    </button>
                                    <button
                                          onClick={() => closeMenuAndScroll("#upload")}
                                          className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                                    >
                                          Upload Resume
                                    </button>
                                    <button
                                          onClick={() => closeMenuAndScroll("#chat")}
                                          className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                                    >
                                          Chat With AI
                                    </button>
                                    <button
                                          onClick={() => closeMenuAndScroll("#profile")}
                                          className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                                    >
                                          Profile
                                    </button>
                                    <button
                                          onClick={() => closeMenuAndScroll("#help")}
                                          className="px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                                    >
                                          Help
                                    </button>
                              </div>

                              {/* Mobile Menu Button */}
                              <button
                                    className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors focus:outline-none"
                                    onClick={toggleMenu}
                              >
                                    {menuOpen ? (
                                          <svg
                                                className="w-6 h-6 text-gray-700"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M6 18L18 6M6 6l12 12"
                                                />
                                          </svg>
                                    ) : (
                                          <svg
                                                className="w-6 h-6 text-gray-700"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M4 6h16M4 12h16M4 18h16"
                                                />
                                          </svg>
                                    )}
                              </button>
                        </div>
                  </div>

                  {/* Mobile Menu */}
                  <div
                        className={`md:hidden glass border-t border-gray-200/50 transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                              }`}
                  >
                        <div className="container mx-auto px-4 py-4 space-y-2">
                              <button
                                    onClick={() => closeMenuAndScroll("#home")}
                                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                              >
                                    Home
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#upload")}
                                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                              >
                                    Upload Resume
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#chat")}
                                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                              >
                                    Chat With AI
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#profile")}
                                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                              >
                                    Profile
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#help")}
                                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 font-medium"
                              >
                                    Help
                              </button>
                        </div>
                  </div>
            </nav>
      );
};

export default Navbar;
