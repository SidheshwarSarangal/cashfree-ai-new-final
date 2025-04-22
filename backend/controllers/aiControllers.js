import Groq from 'groq-sdk';
import dotenv from 'dotenv';

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
      model: 'mixtral-8x7b-32768',
    });

    const translatedText = completion.choices[0]?.message?.content?.trim();
    res.send(translatedText || 'Translation failed');
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
