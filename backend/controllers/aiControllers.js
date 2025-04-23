import Groq from 'groq-sdk';

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

// === MULTER SETUP ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `audio-${Date.now()}${path.extname(file.originalname)}`);
  },
});
export const upload = multer({ storage });

// === AUDIO TRANSLATION CONTROLLER ===
export const audioToTextController = async (req, res) => {
  try {
    const audioPath = req.file?.path;

    if (!audioPath) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Prepare form data for sending the audio file to the translation API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(audioPath));
    formData.append('model', 'whisper-large-v3');
    formData.append('response_format', 'json');

    // Sending the request to the Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/audio/translations',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    // Delete the file after use
    fs.unlinkSync(audioPath);

    // Send back the translated text
    return res.json({
      success: true,
      translatedText: response.data.text,
    });

  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Translation failed',
    });
  }
};



const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const translateController = async (req, res) => {
  try {
    const { inputLang, outputLang, inputText } = req.body;

    if (!inputLang || !outputLang || !inputText) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = `Translate this text from ${inputLang} to ${outputLang}:\n${inputText}\nOnly return the translated text, nothing else.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const translatedText = completion.choices[0]?.message?.content?.trim();
    res.send(translatedText || 'Translation failed');
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const textToSpeechController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing text input' });
    }

    const response = await groq.audio.speech.create({
      model: 'playai-tts',
      voice: 'Fritz-PlayAI',
      input: text,
      response_format: 'wav'
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    // Set headers to serve audio file
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', 'inline; filename="speech.wav"');
    res.send(buffer);

  } catch (error) {
    console.error('Text-to-speech error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

