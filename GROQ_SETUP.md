# Groq AI Integration Setup

## Overview

This application uses Groq AI to power:
- **Chat Assistant**: Career guidance and resume tips
- **Resume Analysis**: Skill extraction and job recommendations

## Getting Your Groq API Key

1. Visit [Groq Console](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

## Configuration

1. Open the `.env` file in the project root
2. Add your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_actual_api_key_here
   ```
3. Save the file
4. Restart the development server:
   ```bash
   npm run dev
   ```

## Features

### Chat Assistant
- Powered by `llama-3.3-70b-versatile` model
- Provides career guidance, resume tips, and interview preparation advice
- Maintains conversation history
- Suggested prompts for quick start

### Resume Analysis
- Extracts technical and soft skills
- Estimates years of experience
- Identifies education level
- Generates personalized job recommendations with:
  - Match percentages
  - Required skills
  - Salary ranges
  - Location information

## Usage

### Chat
1. Navigate to the Chat section
2. Type your career question
3. Press Enter or click Send
4. Get instant AI-powered advice

### Resume Upload
1. Navigate to the Upload section
2. Drag and drop your resume or click to browse
3. Supported formats: PDF, DOC, DOCX, TXT, RTF, HTML
4. Click "Analyze Resume"
5. Wait for AI analysis (10-30 seconds)
6. View personalized job recommendations

## Troubleshooting

### "Groq API key is not configured"
- Make sure you've added the API key to `.env`
- Ensure the key starts with `VITE_GROQ_API_KEY=`
- Restart the dev server after adding the key

### "Failed to analyze resume"
- Check your internet connection
- Verify your API key is valid
- Ensure the resume file contains readable text
- Try a different file format (TXT works best for testing)

### Rate Limits
- Groq free tier has rate limits
- If you hit limits, wait a few minutes before trying again
- Consider upgrading to a paid plan for higher limits

## API Models Used

- **Chat**: `llama-3.3-70b-versatile`
- **Resume Analysis**: `llama-3.3-70b-versatile`
- **Job Recommendations**: `llama-3.3-70b-versatile`

## File Structure

```
src/
├── components/
│   ├── Chat.jsx          # Chat interface with Groq integration
│   └── Upload.jsx        # Resume upload with AI analysis
└── utils/
    ├── groqApi.js        # Groq API functions
    └── fileUtils.js      # File handling utilities
```

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- API keys are loaded client-side (safe for demo purposes)
- For production, use a backend proxy to protect API keys

## Next Steps

1. Add your Groq API key to `.env`
2. Test the chat feature with a career question
3. Upload a sample resume to test analysis
4. Explore the AI-powered job recommendations!
