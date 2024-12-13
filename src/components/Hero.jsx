// Importing necessary modules
import React from "react";
import Upload from "./Upload";

const Hero = () => {
      return (
            <>
                  <section className="bg-gray-100 text-center py-20">
                        <div className="container mx-auto">
                              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                                    Do you want to find out your career path?
                              </h1>
                              <p className="text-lg text-gray-600 mb-8">
                                    Let us help you discover the best job roles based on your skills.
                              </p>
                              <a
                                    href="#upload"
                                    className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
                              >
                                    Upload Your Resume
                              </a>
                        </div>
                  </section>

                  <section id="upload">
                        <Upload />
                  </section>
            </>
      );
};

export default Hero;
