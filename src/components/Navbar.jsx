import React, { useState } from "react";

const Navbar = () => {
      const [menuOpen, setMenuOpen] = useState(false);

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
            <nav className="bg-blue-600 text-white p-4 fixed w-full z-50">
                  <div className="container mx-auto flex items-center justify-between">
                        {/* Logo or Brand */}
                        <div className="text-xl font-bold">Resume2Role</div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex space-x-6">
                              <button
                                    onClick={() => closeMenuAndScroll("#home")}
                                    className="hover:underline"
                              >
                                    Home
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#upload")}
                                    className="hover:underline"
                              >
                                    Upload Resume
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#chat")}
                                    className="hover:underline"
                              >
                                    Chat With AI
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#profile")}
                                    className="hover:underline"
                              >
                                    Profile
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#help")}
                                    className="hover:underline"
                              >
                                    Help
                              </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                              className="md:hidden text-white focus:outline-none z-30"
                              onClick={toggleMenu}
                        >
                              {menuOpen ? (
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
                                                d="M6 18L18 6M6 6l12 12"
                                          ></path>
                                    </svg>
                              ) : (
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
                              )}
                        </button>
                  </div>

                  {/* Mobile Menu */}
                  <div
                        className={`md:hidden bg-blue-600 text-white absolute w-full top-4 left-0 transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-0" : "-translate-y-full"
                              }`}
                  >
                        <div className="space-y-4 p-4">
                              <button
                                    onClick={() => closeMenuAndScroll("#home")}
                                    className="block hover:underline"
                              >
                                    Home
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#upload")}
                                    className="block hover:underline"
                              >
                                    Upload Resume
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#chat")}
                                    className="block hover:underline"
                              >
                                    Chat With AI
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#profile")}
                                    className="block hover:underline"
                              >
                                    Profile
                              </button>
                              <button
                                    onClick={() => closeMenuAndScroll("#help")}
                                    className="block hover:underline"
                              >
                                    Help
                              </button>
                        </div>
                  </div>
            </nav>
      );
};

export default Navbar;
