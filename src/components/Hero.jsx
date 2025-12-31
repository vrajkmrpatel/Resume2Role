// Importing necessary modules
import React from "react";
import Upload from "./Upload";
import Chat from "./Chat";
import Profile from "./Profile";
import Help from "./Help";

const Hero = () => {
      return (
            <>
                  <section className="relative bg-gradient-hero text-center pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden" id="home">
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 overflow-hidden">
                              <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
                              <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="container mx-auto px-4 relative z-10">
                              <div className="animate-fadeInUp">
                                    {/* Trust Badge */}
                                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                          </svg>
                                          <span className="text-white font-medium text-sm">Powered by AI</span>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                                          Discover Your Perfect
                                          <br />
                                          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block mt-2">
                                                Career Path
                                          </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                                          Upload your resume and let our AI analyze your skills to recommend the best job roles tailored just for you.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                          <a
                                                href="#upload"
                                                className="btn-primary animate-float"
                                          >
                                                Upload Your Resume
                                                <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                          </a>
                                          <a
                                                href="#chat"
                                                className="px-8 py-3 rounded-lg font-semibold bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                                          >
                                                Chat With AI
                                          </a>
                                    </div>

                                    {/* Stats/Trust Indicators */}
                                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                                          <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">1000+</div>
                                                <div className="text-sm text-white/80">Resumes Analyzed</div>
                                          </div>
                                          <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                                                <div className="text-sm text-white/80">Job Matches</div>
                                          </div>
                                          <div className="text-center">
                                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">95%</div>
                                                <div className="text-sm text-white/80">Satisfaction</div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>

                  <section id="upload">
                        <Upload />
                  </section>
                  <section id="chat">
                        <Chat />
                  </section>
                  <section id="profile">
                        <Profile />
                  </section>
                  <section id="help">
                        <Help />
                  </section>
            </>
      );
};

export default Hero;
