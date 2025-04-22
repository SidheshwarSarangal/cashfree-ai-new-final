import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";


dotenv.config();


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



export const audioToTextController = async (req, res) => {
  try {
    const audioPath = req.file.path; // assuming multer handles file upload

    const formData = new FormData();
    formData.append("file", fs.createReadStream(audioPath));
    formData.append("model", "whisper-large-v3");
    formData.append("response_format", "json");
    formData.append("task", "translate"); // ensures English output

    const response = await axios.post("https://api.groq.com/openai/v1/audio/translations", formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    });

    fs.unlinkSync(audioPath); // delete temp file

    return res.json({
      success: true,
      translatedText: response.data.text,
    });

  } catch (err) {
    console.error("Audio to Text Error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to transcribe audio.",
    });
  }
};
