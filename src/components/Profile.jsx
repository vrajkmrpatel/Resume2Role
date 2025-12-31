import React, { useState } from "react";

const Profile = () => {
    const [savedJobs, setSavedJobs] = useState([
        { id: 1, title: "Frontend Developer", company: "Tech Corp", match: 92, saved: true },
        { id: 2, title: "Full Stack Engineer", company: "StartupXYZ", match: 88, saved: true },
        { id: 3, title: "React Developer", company: "Digital Agency", match: 85, saved: true },
    ]);

    const removeSavedJob = (id) => {
        setSavedJobs(savedJobs.filter(job => job.id !== id));
    };

    return (
        <section className="section-padding bg-white">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12 animate-fadeInUp">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
                        Your Profile
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Manage your resume history and saved job recommendations
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Profile Info Card */}
                    <div className="md:col-span-1">
                        <div className="card">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-glow">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
                                <p className="text-gray-600 text-sm">user@example.com</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Resumes Uploaded</span>
                                    <span className="font-bold text-primary-600">3</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Jobs Saved</span>
                                    <span className="font-bold text-primary-600">{savedJobs.length}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Match Rate</span>
                                    <span className="font-bold text-secondary-600">88%</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-glow transition-all duration-300">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Saved Jobs */}
                    <div className="md:col-span-2">
                        <div className="card">
                            <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                Saved Jobs
                            </h3>

                            {savedJobs.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No saved jobs yet</p>
                                    <p className="text-gray-400 text-sm mt-2">Upload your resume to get personalized recommendations</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {savedJobs.map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 mb-1">{job.title}</h4>
                                                <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex items-center">
                                                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                                            <div
                                                                className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full"
                                                                style={{ width: `${job.match}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-semibold text-primary-600">{job.match}% Match</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                                                    View Details
                                                </button>
                                                <button
                                                    onClick={() => removeSavedJob(job.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Resume History */}
                        <div className="card mt-6">
                            <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Resume History
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">Resume_2024.pdf</p>
                                            <p className="text-sm text-gray-500">Uploaded 2 days ago</p>
                                        </div>
                                    </div>
                                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                        Re-analyze
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
