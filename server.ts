import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required in the environment secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': "aistudio-build"
        }
      }
    });
  }
  return aiInstance;
}

function parseBase64Image(dataUrl: string): { mimeType: string; base64Data: string } {
  const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mimeType: matches[1],
      base64Data: matches[2]
    };
  }
  return {
    mimeType: "image/jpeg",
    base64Data: dataUrl.includes("base64,") ? dataUrl.split("base64,")[1] : dataUrl
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support up to 20mb payload for image uploads
  app.use(express.json({ limit: "20mb" }));

  // API endpoint for AI room reimagination
  app.post("/api/reimagine", async (req, res) => {
    try {
      const { image, style } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Room image is required." });
      }

      if (!style) {
        return res.status(400).json({ error: "Style choice is required." });
      }

      const { mimeType, base64Data } = parseBase64Image(image);

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: `Reimagine this room image with the following design style: "${style}". Use the environment, empty/furnished details in the picture to curate a personalized design report card. Respond strictly in the specified JSON schema.`
          }
        ],
        config: {
          systemInstruction: `You are Zanori Spaces' AI design consultant. When given a room photo and a style, respond ONLY with a JSON object in this exact format — no preamble, no markdown:
{
  "style_name": "<the chosen style>",
  "headline": "<a single evocative sentence describing the transformed room, max 12 words, in Cormorant Garamond italic style — poetic, not technical>",
  "palette": ["<hex1>", "<hex2>", "<hex3>", "<hex4>"],
  "palette_names": ["<name1>", "<name2>", "<name3>", "<name4>"],
  "furniture_suggestions": [
    { "piece": "<furniture name from Zanori Spaces catalogue (e.g. Lund queen bed, Oslo 3-seater sofa, Fjord open shelf unit, Bergen dining table, Stavanger storage cabinet, Kiel side table, Malmö accent chair, or Tromsø bookshelf)>", "reason": "<one sentence why it fits this room and style>" },
    { "piece": "<another furniture name from Zanori Spaces catalogue>", "reason": "<reason>" },
    { "piece": "<a third furniture name from Zanori Spaces catalogue>", "reason": "<reason>" }
  ],
  "designer_note": "<2–3 sentences written as a Zanori Spaces designer speaking directly to the client about their specific room — warm, expert, personal>"
}

Zanori Spaces catalogue pieces: Lund queen bed, Oslo 3-seater sofa, Fjord open shelf unit, Bergen dining table, Stavanger storage cabinet, Kiel side table, Malmö accent chair, Tromsø bookshelf.`,
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const resultObj = JSON.parse(cleanJson);

      return res.json(resultObj);
    } catch (error: any) {
      console.error("Error in /api/reimagine:", error);
      return res.status(500).json({
        error: "Our designer AI is resting. Try again in a moment.",
        details: error?.message || error
      });
    }
  });

  // Vite middleware for development or fallback static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
}

startServer();
