import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default to port 3000

// Middleware
// Enable CORS for all origins during development to allow frontend to communicate with backend
app.use(cors());
// Parse JSON request bodies, with a limit to handle potentially large image data
app.use(bodyParser.json({ limit: '50mb' }));

// Placeholder for the /api/reimagine endpoint
// This endpoint is called by the RoomRenderer.tsx component
app.post('/api/reimagine', async (req, res) => {
  console.log('Received request to /api/reimagine');
  const { image, style } = req.body;

  if (!image || !style) {
    return res.status(400).json({ error: 'Image and style are required.' });
  }

  // In a real application, you would integrate with an AI service here
  // (e.g., Google Gemini API) to process the image and generate a design report.
  // For now, we'll simulate a response.
  console.log(`Simulating AI processing for image with style: ${style}`);

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockDesignReport = {
    style_name: style,
    headline: `A stunning ${style} transformation!`,
    palette: ['#F5F4F0', '#8B6F52', '#2A2520', '#A9BBC8'],
    palette_names: ['Sand', 'Wood', 'Bark', 'Muted Blue'],
    furniture_suggestions: [
      { piece: 'Lund queen bed', reason: 'Complements the minimalist aesthetic.' },
      { piece: 'Oslo 3-seater sofa', reason: 'Adds comfort and Scandinavian charm.' },
    ],
    designer_note: `This design embodies the essence of ${style}, blending natural elements with modern sophistication.`,
  };

  res.json(mockDesignReport);
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});