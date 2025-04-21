/*import dotenv from "dotenv";
dotenv.config();

import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import multer from "multer";
import path from "path";
import fs from "fs";


const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fileManager = new GoogleAIFileManager(process.env.AI_API_KEY);


export const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Text and targetLanguage are required." });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Translate the following text to ${targetLanguage}: "${text}"`,
            },
          ],
        },
      ],
      generationConfig: {
       // maxInputTokens: 200, // Limit input tokens
        maxOutputTokens: 200, // Limit output tokens
        temperature: 0.3,
      },
    });

    const translatedText = result.response.text();

    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: "Translation failed", details: error.message });
  }
};











// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter }).single("audio");

// **Convert multer callback to a Promise**
const uploadFile = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) return reject(err);
      if (!req.file) return reject(new Error("No audio file uploaded"));
      resolve(req.file);
    });
  });
};

// **Audio to text function**
export const audioToText = async (req, res) => {
  try {
    const file = await uploadFile(req, res); // Wait for file upload

    const mediaPath = path.resolve(file.path);
    const uploadResult = await fileManager.uploadFile(mediaPath, {
      mimeType: file.mimetype,
      displayName: file.originalname,
    });

    let fileData = await fileManager.getFile(uploadResult.file.name);
    while (fileData.state === FileState.PROCESSING) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Check every 5s
      fileData = await fileManager.getFile(uploadResult.file.name);
    }

    if (fileData.state === FileState.FAILED) {
      return res.status(500).json({ error: "Audio processing failed" });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: "Transcribe this audio file to text." },
            {
              fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: file.mimetype,
              },
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200, // **Limit response length**
        temperature: 0.2,
      },
    });

    return res.json({ transcript: result.response.text() });
  } catch (error) {
    console.error("Error processing audio:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};

*/



import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Initialize API clients
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fileManager = new GoogleAIFileManager(process.env.AI_API_KEY);

// **Text Translation Function**
export const translateText = async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: "Text and targetLanguage are required." });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `Translate the following text to ${targetLanguage}: "${text}"` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200, // Limit output tokens
        temperature: 0.3,
      },
    });

    res.json({ translatedText: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "Translation failed", details: error.message });
  }
};

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ✅ File filter for audio files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter }).single("audio");

// ✅ Convert multer callback to Promise
const uploadFile = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) return reject(err);
      if (!req.file) return reject(new Error("No audio file uploaded"));
      resolve(req.file);
    });
  });
};

// **Audio to Text Function**
export const audioToText = async (req, res) => {
  try {
    const file = await uploadFile(req, res); // Wait for file upload

    const mediaPath = path.resolve(file.path);
    const uploadResult = await fileManager.uploadFile(mediaPath, {
      mimeType: file.mimetype,
      displayName: file.originalname,
    });

    let fileData = await fileManager.getFile(uploadResult.file.name);
    while (fileData.state === FileState.PROCESSING) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Check every 5s
      fileData = await fileManager.getFile(uploadResult.file.name);
    }

    if (fileData.state === FileState.FAILED) {
      return res.status(500).json({ error: "Audio processing failed" });
    }

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: "Transcribe this audio file to text." },
            {
              fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: file.mimetype,
              },
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 200, // Limit response length
        temperature: 0.2,
      },
    });

    return res.json({ transcript: result.response.text() });
  } catch (error) {
    console.error("Error processing audio:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
