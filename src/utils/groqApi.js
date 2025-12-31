import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true, // Required for client-side usage
});

/**
 * Send a chat message to Groq AI
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} model - Model to use (default: llama-3.3-70b-versatile)
 * @returns {Promise<string>} - AI response text
 */
export async function sendChatMessage(messages, model = "llama-3.3-70b-versatile") {
    try {
        const completion = await groq.chat.completions.create({
            messages: messages,
            model: model,
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
        });

        return completion.choices[0]?.message?.content || "No response generated.";
    } catch (error) {
        console.error("Groq API Error:", error);
        throw new Error(error.message || "Failed to get AI response");
    }
}

/**
 * Analyze resume text and extract skills
 * @param {string} resumeText - Resume content as text
 * @returns {Promise<Object>} - Extracted skills and analysis
 */
export async function analyzeResume(resumeText) {
    try {
        // Truncate resume text if too long (keep first 3000 characters)
        const truncatedText = resumeText.length > 3000
            ? resumeText.substring(0, 3000) + "..."
            : resumeText;

        const prompt = `Analyze this resume and extract key information. Respond ONLY with valid JSON, no other text.

Resume:
${truncatedText}

Extract:
1. Technical skills (max 10)
2. Soft skills (max 5)
3. Years of experience (number only)
4. Education level (one of: "High School", "Bachelor's", "Master's", "PhD", "Other")
5. Key strengths (max 3)

JSON format:
{
  "technicalSkills": ["skill1", "skill2"],
  "softSkills": ["skill1", "skill2"],
  "yearsOfExperience": 3,
  "education": "Bachelor's",
  "keyStrengths": ["strength1", "strength2"]
}`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a resume analyzer. Respond ONLY with valid JSON. No explanations, no markdown, just pure JSON.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
            max_tokens: 1024,
            response_format: { type: "json_object" },
        });

        const response = completion.choices[0]?.message?.content;
        return JSON.parse(response);
    } catch (error) {
        console.error("Resume Analysis Error:", error);
        throw new Error("Failed to analyze resume. Please try a shorter resume or simpler format.");
    }
}

/**
 * Generate job recommendations based on skills
 * @param {Object} skillsData - Extracted skills from resume
 * @returns {Promise<Array>} - Array of job recommendations
 */
export async function generateJobRecommendations(skillsData) {
    try {
        const prompt = `Based on this candidate profile, recommend 4 suitable job roles.

Profile:
- Technical Skills: ${skillsData.technicalSkills?.join(", ") || "Not specified"}
- Soft Skills: ${skillsData.softSkills?.join(", ") || "Not specified"}
- Experience: ${skillsData.yearsOfExperience || 0} years
- Education: ${skillsData.education || "Not specified"}

For each job, provide:
- title: Job title
- company: Company type (e.g., "Tech Startup")
- location: "Remote" or city name
- match: Match percentage (70-98)
- skills: Array of 3-4 required skills
- salary: Salary range (e.g., "$80k - $100k")

Respond with JSON only:
{
  "jobs": [
    {
      "title": "Software Engineer",
      "company": "Tech Startup",
      "location": "Remote",
      "match": 92,
      "skills": ["React", "Node.js", "MongoDB"],
      "salary": "$90k - $120k"
    }
  ]
}`;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a job matching expert. Respond ONLY with valid JSON. No explanations.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.3,
            max_tokens: 1536,
            response_format: { type: "json_object" },
        });

        const response = completion.choices[0]?.message?.content;
        const data = JSON.parse(response);
        return data.jobs || [];
    } catch (error) {
        console.error("Job Recommendation Error:", error);
        throw new Error("Failed to generate job recommendations. Please try again.");
    }
}

/**
 * Get career guidance response
 * @param {string} question - User's career question
 * @returns {Promise<string>} - AI guidance response
 */
export async function getCareerGuidance(question) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful career advisor and resume expert. Provide practical, actionable advice for job seekers. Be concise but thorough.",
                },
                {
                    role: "user",
                    content: question,
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        return completion.choices[0]?.message?.content || "I'm having trouble generating a response. Please try again.";
    } catch (error) {
        console.error("Career Guidance Error:", error);
        throw new Error("Failed to get career guidance");
    }
}

export default groq;
