import React, { useState, useEffect, useRef } from "react";
import { getCareerGuidance } from "../utils/groqApi";

const Chat = () => {
      const [prompt, setPrompt] = useState("");
      const [messages, setMessages] = useState([
            { id: 1, type: 'bot', text: 'Hello! I\'m your AI career assistant powered by Groq. Ask me anything about resume tips, interview preparation, or career guidance!' }
      ]);
      const [isLoading, setIsLoading] = useState(false);
      const messagesEndRef = useRef(null);

      const suggestedPrompts = [
            "How can I improve my resume?",
            "Tips for technical interviews",
            "What skills are in demand?",
            "How to write a cover letter?"
      ];

      const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      useEffect(() => {
            scrollToBottom();
      }, [messages]);

      const handleSubmit = async (e, customPrompt = null) => {
            e?.preventDefault();
            const messageText = customPrompt || prompt;

            if (!messageText.trim()) return;

            // Check if API key is configured
            if (!import.meta.env.VITE_GROQ_API_KEY) {
                  const errorMsg = {
                        id: Date.now(),
                        type: 'bot',
                        text: '⚠️ Groq API key is not configured. Please add your API key to the .env file. Get your free API key at https://console.groq.com'
                  };
                  setMessages(prev => [...prev, errorMsg]);
                  return;
            }

            // Add user message
            const userMessage = { id: Date.now(), type: 'user', text: messageText };
            setMessages(prev => [...prev, userMessage]);
            setPrompt("");
            setIsLoading(true);

            try {
                  const response = await getCareerGuidance(messageText);

                  // Add bot response
                  const botMessage = { id: Date.now() + 1, type: 'bot', text: response };
                  setMessages(prev => [...prev, botMessage]);
            } catch (error) {
                  console.error("Error getting AI response:", error);
                  const errorMessage = {
                        id: Date.now() + 1,
                        type: 'bot',
                        text: "I'm having trouble connecting to the AI service right now. Please check your API key and try again."
                  };
                  setMessages(prev => [...prev, errorMessage]);
            } finally {
                  setIsLoading(false);
            }
      };

      const handleSuggestedPrompt = (suggestedText) => {
            handleSubmit(null, suggestedText);
      };

      return (
            <section className="section-padding bg-white">
                  <div className="container mx-auto max-w-4xl">
                        <div className="text-center mb-8 animate-fadeInUp">
                              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
                                    Chat With AI Assistant
                              </h2>
                              <p className="text-gray-600 text-lg">
                                    Get instant answers to your career questions powered by Groq AI
                              </p>
                        </div>

                        {/* Chat Container */}
                        <div className="card max-w-3xl mx-auto">
                              {/* Messages Area */}
                              <div className="h-96 overflow-y-auto mb-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                                    {messages.map((message) => (
                                          <div
                                                key={message.id}
                                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                                          >
                                                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                                      {/* Avatar */}
                                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user'
                                                                  ? 'bg-gradient-to-br from-primary-600 to-primary-700'
                                                                  : 'bg-gradient-to-br from-secondary-500 to-secondary-600'
                                                            }`}>
                                                            {message.type === 'user' ? (
                                                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                  </svg>
                                                            ) : (
                                                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                                  </svg>
                                                            )}
                                                      </div>

                                                      {/* Message Bubble */}
                                                      <div className={`px-4 py-3 rounded-2xl ${message.type === 'user'
                                                                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-tr-none'
                                                                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                                                            }`}>
                                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                                                      </div>
                                                </div>
                                          </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isLoading && (
                                          <div className="flex justify-start animate-fadeIn">
                                                <div className="flex items-start space-x-2 max-w-[80%]">
                                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
                                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                            </svg>
                                                      </div>
                                                      <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-none">
                                                            <div className="flex space-x-2">
                                                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    )}

                                    <div ref={messagesEndRef} />
                              </div>

                              {/* Suggested Prompts */}
                              {messages.length === 1 && !isLoading && (
                                    <div className="mb-4">
                                          <p className="text-sm text-gray-600 mb-3 font-medium">Suggested questions:</p>
                                          <div className="flex flex-wrap gap-2">
                                                {suggestedPrompts.map((suggested, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => handleSuggestedPrompt(suggested)}
                                                            className="px-4 py-2 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-700 rounded-full text-sm transition-all duration-200 hover:scale-105"
                                                      >
                                                            {suggested}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {/* Input Area */}
                              <form onSubmit={handleSubmit} className="flex items-end space-x-2">
                                    <div className="flex-1">
                                          <textarea
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                placeholder="Ask me anything about your career..."
                                                rows="2"
                                                onKeyDown={(e) => {
                                                      if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            handleSubmit(e);
                                                      }
                                                }}
                                          />
                                    </div>
                                    <button
                                          type="submit"
                                          disabled={isLoading || !prompt.trim()}
                                          className={`p-4 rounded-xl transition-all duration-300 ${isLoading || !prompt.trim()
                                                      ? 'bg-gray-300 cursor-not-allowed'
                                                      : 'bg-gradient-to-br from-primary-600 to-primary-700 hover:shadow-glow hover:scale-105'
                                                }`}
                                    >
                                          {isLoading ? (
                                                <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                          ) : (
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                          )}
                                    </button>
                              </form>

                              <p className="text-xs text-gray-500 mt-3 text-center">
                                    Press Enter to send, Shift+Enter for new line • Powered by Groq AI
                              </p>
                        </div>
                  </div>
            </section>
      );
};

export default Chat;
