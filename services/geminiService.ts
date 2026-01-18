
import { GoogleGenAI, Type } from "@google/genai";
import { SpaceEvent, EventType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CATEGORY_PHOTO_HINTS = `
- NEBULA/INTERSTELLAR: 1462331940025-496dfbfc7564, 1464802686167-b939a67e06a1, 1506318137071-a8e063b4bcc0
- PLANET/ORBITAL: 1614732138822-fd42d6c32a39, 1614730321146-b6fa6a46bcb4, 1614728263952-84ea252f92f8
- STATION/DEEP MISSION: 1517976487492-5750f3195933, 1516849841032-87cbac4d88f7, 1446776811953-b23d57bd21aa
- HIGH ENERGY/GALAXY: 1446776811953-b23d57bd21aa, 1501862700950-efb218298ffa
`;

export const fetchSpaceEvents = async (month: number, year: number): Promise<SpaceEvent[]> => {
  try {
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 12 distinct "Investigative Events" for ${monthName} ${year}. 
      Brand: Stellar - Elite Scientific Concierge.
      
      Themes to focus on: 
      1. Invisible Universe: Dark Matter filaments, Dark Energy expansion anomalies.
      2. High-Energy Universe: Black Hole accretion disks, Supernova Remnants, Pulsar radiation.
      3. Stellar Evolution: Protostars in Nebulae, Galaxy Cluster dynamics.
      4. Orbital Dynamics: Planetary transits and lunar occultations.
      
      Imagery: Use these Unsplash IDs: ${CATEGORY_PHOTO_HINTS}.
      
      Host: Generate an 'Investigator' for each. Tone: Scientific, precise, atmospheric.
      Bios should mention focus areas like "Chandra Legacy Data" or "High-Energy Spectral Analysis".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              date: { type: Type.STRING },
              type: { type: Type.STRING, enum: Object.values(EventType) },
              description: { type: Type.STRING },
              location: { type: Type.STRING },
              agency: { type: Type.STRING },
              host: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  avatarId: { type: Type.STRING },
                  isSuperhost: { type: Type.BOOLEAN },
                  reviewsCount: { type: Type.NUMBER },
                  rating: { type: Type.NUMBER },
                  yearsExperience: { type: Type.NUMBER },
                  bio: { type: Type.STRING }
                }
              },
              metadata: {
                type: Type.OBJECT,
                properties: {
                  rarity: { type: Type.NUMBER },
                  visibility: { type: Type.STRING },
                  photoId: { type: Type.STRING }
                }
              }
            },
            required: ["id", "title", "date", "type", "description", "location", "metadata", "host"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error fetching space calendar events:", error);
    return [];
  }
};

export const getDeepDive = async (event: SpaceEvent): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Provide a detailed "Investigation Briefing" for the cosmic event: ${event.title}. 
      Include:
      1. Precise Orbital Coordinates in ${event.location}.
      2. Spectral Significance (UV, X-Ray, or Gamma).
      3. Impact on the 'Invisible Universe' (Dark Matter/Energy context).
      4. Scientific Observation Precautions.
      Tone: High-end scientific analysis. Avoid flowery language, use evocative scientific terms.`,
    });
    return response.text || "Telemetry link severed.";
  } catch (error) {
    console.error("Error getting deep dive:", error);
    return "Error retrieving data stream.";
  }
};
