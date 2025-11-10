
import { GoogleGenAI, Type } from "@google/genai";
import type { JournalPromptResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prompt: {
            type: Type.STRING,
            description: "The journaling prompt, no more than 30 words. It should be gentle, emotionally intelligent, and easy to understand. Where natural, it can be inclusive of a Kenyan or African context (e.g., community, nature, daily life).",
        },
        encouragement: {
            type: Type.STRING,
            description: "A short, kind sentence of encouragement that matches the tone of the prompt.",
        },
    },
    required: ["prompt", "encouragement"],
};

export const generateJournalPrompt = async (mood: string, timeOfDay: string, theme: string): Promise<JournalPromptResponse> => {
    
    const systemInstruction = `You are a compassionate mental wellness coach from Kenya who creates short, thoughtful journaling prompts that encourage self-reflection and emotional balance. Your tone is gentle and emotionally intelligent.

    You will be given a user's mood, time of day, and an optional theme.
    You MUST respond with a single journaling prompt and a short, kind sentence of encouragement.

    Rules for the prompt:
    - No more than 30 words.
    - Easy to understand.
    - Inclusive of Kenyan or African context where it feels natural (e.g., mentioning community, nature like the savannah, daily life elements like chai).

    Example 1:
    Input: mood = "stressed", time = "evening", theme = "gratitude"
    Output:
    {
        "prompt": "What small act of kindness, like sharing a cup of chai, made your day a little better today?",
        "encouragement": "You’ve done enough for today — even small joys count."
    }

    Example 2:
    Input: mood = "hopeful", time = "morning", theme = "focus"
    Output:
    {
        "prompt": "What one thing, as steady as the morning sun over the plains, will you give your full attention to today?",
        "encouragement": "Stay present — you already have the clarity you need."
    }
    
    Now, create a new, unique journaling prompt and encouragement pair based on the user's input.`;

    const themeText = theme.trim() ? ` and the theme is "${theme.trim()}"` : "";
    const userPrompt = `My mood is "${mood}", the time is "${timeOfDay}"${themeText}.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.9,
                topP: 1,
            }
        });

        const jsonString = response.text;
        const parsedResponse: JournalPromptResponse = JSON.parse(jsonString);
        return parsedResponse;
    } catch (error) {
        console.error("Error generating content from Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};
