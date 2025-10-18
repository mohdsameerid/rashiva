import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = import.meta.env.VITE_GOOGLE_GEMINI_KEY;

// Initialize Gemini API
export const initializeGemini = (apiKey) => {
    genAI = new GoogleGenerativeAI(apiKey || import.meta.env.VITE_GOOGLE_GEMINI_KEY);
};

// Generate Astrologer response
export const generateAstroResponse = async (prompt, context = '') => {
    if (!genAI) {
        throw new Error('Gemini API not initialized. Please provide your API key.');
    }

    // Use the working model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const astroContext = `You are a wise and friendly astrologer named Rashiva. You provide spiritual guidance,
astrological insights, and cosmic wisdom with warmth and empathy. You speak in a gentle, mystical tone but remain
practical and helpful. ${context}`;

    const fullPrompt = `${astroContext}\n\nUser: ${prompt}\n\nRashiva:`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text(); // Extract text from response
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};

// Generate Kundali interpretation
export const interpretKundali = async (name, dob, tob, pob) => {
    const prompt = `A person named ${name} was born on ${dob} at ${tob} in ${pob}.
Please provide a detailed birth chart interpretation including their zodiac sign, sun sign, moon sign,
personality traits, strengths, weaknesses, and life path guidance. Make it personal and insightful.`;

    return generateAstroResponse(prompt, 'Focus on creating a comprehensive Kundali reading.');
};


export const matchKundali = async (person1, person2) => {
    const prompt = `Person A: ${person1.name}, born on ${person1.dob} at ${person1.tob} in ${person1.pob}.
  Person B: ${person2.name}, born on ${person2.dob} at ${person2.tob} in ${person2.pob}.

  Please analyze their astrological compatibility. Provide a compatibility percentage and detailed insights
  about their relationship dynamics, emotional connection, strengths as a couple, potential challenges,
  and advice for harmony.`;

    return generateAstroResponse(prompt, 'Focus on relationship compatibility and cosmic connection.');
};

export const getZodiacInsights = async (zodiacSign) => {
    const prompt = `Tell me everything about the ${zodiacSign} zodiac sign. Include personality traits,
  strengths, weaknesses, love life, career prospects, lucky numbers, lucky colors, and advice for personal growth.
  Make it detailed and insightful.`;

    return generateAstroResponse(prompt, 'Provide comprehensive zodiac sign analysis.');
};
