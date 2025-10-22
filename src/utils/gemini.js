import { GoogleGenerativeAI } from '@google/generative-ai';
import { getlocalStorageSelectedLanguage } from './apphelper';

let genAI = import.meta.env.VITE_GOOGLE_GEMINI_KEY;

const language = getlocalStorageSelectedLanguage();
const langNote = language === 'hi' ? 'Answer in Hindi.' : 'Answer in English.';

// Initialize Gemini API
export const initializeGemini = (apiKey) => {
    genAI = new GoogleGenerativeAI(apiKey || import.meta.env.VITE_GOOGLE_GEMINI_KEY);
};

// Generate Astrologer response
export const generateAstroResponse = async (prompt, context = '', contentLength = 250) => {
    if (!genAI) {
        throw new Error('Gemini API not initialized. Please provide your API key.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const astroContext = `
You are Rashiva — a friendly, human-like astrologer.
Speak in short, natural messages (~${contentLength} characters). 
Sound warm, intuitive, and curious — like a person chatting, not lecturing.
Keep replies simple, heartfelt, and real. Avoid heavy poetic tone.
If question isn’t about astrology, gently steer the conversation back.
Use small conversational pauses like “hmm”, “I feel”, “dear”, or “let’s see”.
Example tone:
User: When will I marry?
Rashiva: Hmm, I sense marriage vibes strengthening soon, maybe late next year. You seem emotionally ready for it. By the way, do you feel ready for such changes, dear?
${context}
`;

    const fullPrompt = `
${astroContext}

${langNote}

User: ${prompt}

Rashiva:
`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text().trim();
        return text;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};


// Generate Kundali interpretation
export const interpretKundali = async (name, dob, tob, pob) => {
    if (!genAI) {
        throw new Error('Gemini API not initialized. Please provide your API key.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const astroContext = `
You are Rashiva — a warm, intuitive human astrologer.
You speak like you're personally talking to the person in front of you, not reading a script.
Keep your tone gentle, mystical, and deeply empathetic.
Explain insights in 250–400 characters per section.
Cover zodiac sign, sun sign, moon sign, personality, emotional traits, strengths, weaknesses, and life guidance.
Blend accuracy with intuition. 
Avoid robotic lists — make it flow naturally, as a personal reading.
End with a small.
`;

    const prompt = `
A person named ${name} was born on ${dob} at ${tob} in ${pob}.
Provide a conversational and personal Kundali interpretation.
Describe their astrological makeup with warmth and depth.
`;

    const fullPrompt = `
${astroContext}

${langNote}

User: ${prompt}

Rashiva:
`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text().trim();
        return text;
    } catch (error) {
        console.error('Error generating Kundali:', error);
        throw error;
    }
};



export const matchKundali = async (person1, person2) => {
    const prompt = `Person A: ${person1.name}, born on ${person1.dob} at ${person1.tob} in ${person1.pob}.
  Person B: ${person2.name}, born on ${person2.dob} at ${person2.tob} in ${person2.pob}.

  Please analyze their astrological compatibility. Provide a compatibility percentage and detailed insights
  about their relationship dynamics, emotional connection, strengths as a couple, potential challenges,
  and advice for harmony. ${langNote}`;

    return generateAstroResponse(prompt, 'Focus on relationship compatibility and cosmic connection.', 500);
};

export const generateZodiacInsightsResponse = async (prompt, context = '') => {
    if (!genAI) {
        throw new Error('Gemini API not initialized. Please provide your API key.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const astroContext = `
         You are Rashiva — a warm, conversational astrologer who speaks like a real person.
         You share zodiac insights with emotion, empathy, and light mysticism — not robotic lists.
         Each response should sound natural, insightful, and about 1000 characters long.
         ${context}
         `;

    const fullPrompt = `
         ${astroContext}

         ${langNote}
         
         User: ${prompt}
         
         Rashiva:
   `;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text().trim();
        return text;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};

export const getZodiacInsights = async (zodiacSign) => {
    const prompt = `
             Ah, let's talk about ${zodiacSign}. 
             Describe its personality, emotional nature, strengths, challenges, love life, career energy, lucky color and number, and one gentle advice — 
             but say it conversationally, as if Rashiva is speaking directly to the user.
             ${langNote}
         `;

    return generateZodiacInsightsResponse(prompt, `Provide human-like insights about ${zodiacSign} sign.`);
};
