
import { GoogleGenAI, Type } from "@google/genai";
import { CartItem, RecipeSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRecipeSuggestions = async (cartItems: CartItem[]): Promise<RecipeSuggestion[]> => {
  if (cartItems.length === 0) return [];

  const itemsList = cartItems.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ');
  const prompt = `Based on these ingredients in the cart: ${itemsList}, suggest 3 healthy and easy-to-cook recipes. Focus on traditional South Indian or general Asian cuisine as these ingredients are typically from that region. Include instructions and a brief description.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              instructions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
            },
            required: ["title", "description", "ingredients", "instructions"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Recipe Suggestion Error:", error);
    return [];
  }
};

export const getSmartAssistantResponse = async (query: string, cartItems: CartItem[]): Promise<string> => {
  const itemsList = cartItems.length > 0
    ? `User currently has these in their cart: ${cartItems.map(i => i.name).join(', ')}.`
    : "User's cart is empty.";

  const prompt = `You are a helpful assistant for "Green Trust Grocery", a premium farm-fresh produce store. 
    ${itemsList}
    User Question: ${query}
    Provide a concise, helpful, and friendly response about nutrition, storage tips, or product information.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return "Our AI assistant is currently tending to the fields. Please try again later!";
  }
};
