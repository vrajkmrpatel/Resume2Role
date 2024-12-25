// Importing necessary modules
import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(uploadedFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    if (file) {
      alert("File uploaded successfully");
      // Add upload logic here
    } else {
      alert("Please upload a file before submitting.");
    }
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Optimize your resume in minutes
        </h2>

        {/* Step Progress */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full">
                1
              </div>
              <span className="text-sm mt-2">Upload Resume</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
                2
              </div>
              <span className="text-sm mt-2">AI Scan</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full">
                3
              </div>
              <span className="text-sm mt-2">View Results</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center mb-8">
          <label
            htmlFor="resume-upload"
            className="w-3/4 h-80 border-2 border-dashed border-blue-300 flex flex-col justify-center items-center bg-white text-blue-600 cursor-pointer hover:bg-blue-50"
          >
            {preview ? (
              <div className="text-center">
                <iframe
                  src={preview}
                  title="Resume Preview"
                  className="w-full h-64 border"
                ></iframe>
                <button
                  className="text-red-500 mt-4"
                  onClick={handleFileRemove}
                >
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-blue-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4M16 10l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-sm">Drag and drop a file here</p>
                <p className="text-xs text-gray-500">Files we can read: DOC, DOCX, PDF, HTML, RTF, TXT</p>
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
          className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default Upload;
