// Importing necessary modules
import React from "react";

const Upload = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Upload your resume here</h2>
        <div className="flex justify-center items-center mb-8">
          <label
            htmlFor="resume-upload"
            className="w-80 h-80 border-4 border-dashed border-gray-400 flex justify-center items-center bg-white text-gray-600 cursor-pointer hover:bg-gray-100"
          >
            <span>Drag and drop your file here, or click to select</span>
          </label>
          <input
            id="resume-upload"
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
        </div>
        <button className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </section>
  );
};

export default Upload;
