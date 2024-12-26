import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
      const [prompt, setPrompt] = useState("");
      const [response, setResponse] = useState("");
      const [isLoading, setIsLoading] = useState(false);

      // Scroll to section when response changes
      useEffect(() => {
            if (response) {
                  const section = document.querySelector("#generate");
                  if (section) {
                        section.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                        });
                  }
            }
      }, [response]); // Runs when the response changes

      const handleSubmit = async (e) => {
            e.preventDefault();
            setIsLoading(true); // Show loading indicator
            setResponse(""); // Clear previous response
            try {
                  const res = await axios.post("https://render-flask-app-gn0m.onrender.com/api/generate", {
                        prompt: prompt,
                  });
                  setResponse(res.data.text);
            } catch (error) {
                  console.error("Error generating text:", error.message);
                  setResponse("An error occurred while generating the text.");
            } finally {
                  setIsLoading(false); // Hide loading indicator
            }
      };

      return (
            <div className="text-center m-8 px-4">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                        Chat With AI
                  </h2>
                  <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                              {/* Textarea */}
                              <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Ask Gemini..."
                                    rows="4"
                              ></textarea>

                              {/* Generate Text Button */}
                              <button
                                    className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    disabled={isLoading} // Disable button while loading
                              >
                                    {isLoading ? "Generating..." : "Generate Text"}
                              </button>
                        </div>
                  </form>

                  {/* Loading Indicator */}
                  {isLoading && (
                        <div className="mt-4 text-blue-600 font-medium">
                              Please wait... Generating...
                        </div>
                  )}

                  {/* Response Display */}
                  {response && !isLoading && (
                        <section id="generate">
                              <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-md max-w-lg mx-auto">
                                    <h1 className="text-xl md:text-2xl text-blue-600 mb-2">
                                          Generated Text:
                                    </h1>
                                    <p className="text-gray-800">{response}</p>
                              </div>
                        </section>
                  )}
            </div>
      );
};

export default Chat;
