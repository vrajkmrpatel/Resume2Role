import React, { useState } from "react";

const Help = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const faqs = [
        {
            id: 1,
            question: "How does Resume2Role work?",
            answer: "Simply upload your resume in PDF, DOCX, or other supported formats. Our AI analyzes your skills, experience, and qualifications to match you with the most suitable job roles in our database."
        },
        {
            id: 2,
            question: "What file formats are supported?",
            answer: "We support DOC, DOCX, PDF, HTML, RTF, and TXT file formats. Make sure your resume is well-formatted for best results."
        },
        {
            id: 3,
            question: "Is my data secure?",
            answer: "Yes! We take data security seriously. Your resume and personal information are encrypted and stored securely. We never share your data with third parties without your consent."
        },
        {
            id: 4,
            question: "How accurate are the job recommendations?",
            answer: "Our AI-powered matching algorithm analyzes multiple factors including skills, experience, education, and job requirements to provide highly accurate recommendations with match percentages."
        },
        {
            id: 5,
            question: "Can I save job recommendations?",
            answer: "Yes! You can save your favorite job recommendations to your profile and access them anytime. Just click the bookmark icon on any job card."
        },
        {
            id: 6,
            question: "How do I use the AI Chat feature?",
            answer: "The AI Chat feature allows you to ask questions about career guidance, resume tips, interview preparation, and more. Simply type your question and get instant AI-powered responses."
        }
    ];

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12 animate-fadeInUp">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
                        Help & Support
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Find answers to common questions or get in touch with us
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Quick Help Cards */}
                    <div className="card hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Getting Started Guide</h3>
                        <p className="text-gray-600 mb-4">Learn how to upload your resume and get the best job recommendations.</p>
                        <a href="#upload" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center">
                            Read Guide
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>

                    <div className="card hover:scale-105 transition-transform duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-secondary-600 to-secondary-700 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Video Tutorials</h3>
                        <p className="text-gray-600 mb-4">Watch step-by-step video guides on using Resume2Role features.</p>
                        <button className="text-secondary-600 font-semibold hover:text-secondary-700 inline-flex items-center">
                            Watch Videos
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6 text-center">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="card cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-gray-800 flex-1">{faq.question}</h4>
                                    <svg
                                        className={`w-5 h-5 text-primary-600 transition-transform duration-200 ${openFaq === faq.id ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {openFaq === faq.id && (
                                    <p className="mt-4 text-gray-600 leading-relaxed animate-fadeIn">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card max-w-2xl mx-auto">
                    <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6 text-center">
                        Still Need Help?
                    </h3>
                    <p className="text-gray-600 text-center mb-8">
                        Send us a message and we'll get back to you as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                placeholder="How can we help?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                placeholder="Tell us more about your question..."
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Help;
