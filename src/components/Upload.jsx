// Importing necessary modules
import React, { useState } from "react";
import { analyzeResume, generateJobRecommendations } from "../utils/groqApi";
import { extractTextFromFile } from "../utils/fileUtils";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [analysisError, setAnalysisError] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    processFile(uploadedFile);
  };

  const processFile = (uploadedFile) => {
    setFile(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(uploadedFile);
      setCurrentStep(1);
      setShowResults(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
    setCurrentStep(1);
    setShowResults(false);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file before submitting.");
      return;
    }

    // Check if API key is configured
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      alert("⚠️ Groq API key is not configured. Please add your API key to the .env file.\n\nGet your free API key at https://console.groq.com");
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(2);
    setAnalysisError(null);
    setJobs([]);

    try {
      // Extract text from file
      const resumeText = await extractTextFromFile(file);

      // Analyze resume with Groq AI
      const skillsData = await analyzeResume(resumeText);

      // Generate job recommendations
      const recommendations = await generateJobRecommendations(skillsData);

      // Add IDs to recommendations
      const jobsWithIds = recommendations.map((job, index) => ({
        ...job,
        id: index + 1
      }));

      setJobs(jobsWithIds);
      setCurrentStep(3);
      setShowResults(true);

      // Scroll to results
      setTimeout(() => {
        document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Resume analysis error:", error);
      setAnalysisError(error.message || "Failed to analyze resume. Please try again.");
      setCurrentStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const steps = [
    { number: 1, title: "Upload Resume", icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" },
    { number: 2, title: "AI Scan", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { number: 3, title: "View Results", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
            Optimize Your Resume in Minutes
          </h2>
          <p className="text-gray-600 text-lg">
            Upload your resume and let AI find your perfect job match
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full transition-all duration-300 ${currentStep >= step.number
                    ? 'bg-gradient-to-br from-primary-600 to-secondary-500 shadow-glow'
                    : 'bg-gray-200'
                    }`}>
                    {currentStep > step.number ? (
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className={`w-6 h-6 md:w-8 md:h-8 ${currentStep >= step.number ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs md:text-sm mt-2 font-medium ${currentStep >= step.number ? 'text-primary-600' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-12 md:w-24 transition-all duration-300 ${currentStep > step.number ? 'bg-gradient-to-r from-primary-600 to-secondary-500' : 'bg-gray-300'
                    }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="card max-w-3xl mx-auto mb-8">
          <div className="flex flex-col items-center">
            <label
              htmlFor="resume-upload"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`w-full h-80 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${dragActive
                ? 'border-primary-500 bg-primary-50 scale-105'
                : preview
                  ? 'border-gray-300 bg-gray-50'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
            >
              {preview ? (
                <div className="text-center w-full h-full p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); handleFileRemove(); }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 h-48 overflow-auto">
                    <p className="text-sm text-gray-600">Resume preview loaded successfully!</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {dragActive ? "Drop your file here" : "Drag and drop your resume"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">or click to browse</p>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">DOC</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">TXT</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">RTF</span>
                  </div>
                </>
              )}
            </label>
            <input
              id="resume-upload"
              type="file"
              className="hidden"
              accept=".doc,.docx,.pdf,.html,.rtf,.txt"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <button
            className={`w-full mt-6 btn-primary ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Resume...
              </>
            ) : (
              <>
                Analyze Resume
                <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {analysisError && (
          <div className="card max-w-3xl mx-auto mb-8 bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-bold text-red-800 mb-1">Analysis Failed</h4>
                <p className="text-red-700 text-sm">{analysisError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && jobs.length > 0 && (
          <div id="results" className="animate-fadeInUp">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-2">
                Your AI-Powered Job Recommendations
              </h3>
              <p className="text-gray-600">Analyzed by Groq AI based on your skills and experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="card hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h4>
                      <p className="text-gray-600 mb-2">{job.company}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${job.match >= 90 ? 'text-green-600' : job.match >= 85 ? 'text-primary-600' : 'text-secondary-600'}`}>
                        {job.match}%
                      </div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${job.match}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-gray-700">{job.salary}</span>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Upload;
