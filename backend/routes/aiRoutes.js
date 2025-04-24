import { Router } from "express";
import { translateController, textToSpeechController, upload, audioToTextController,  analyzeImage } from "../controllers/aiControllers.js";

const router = Router();

// Define chat route
router.post('/text-text', translateController);
router.post('/text-speech', textToSpeechController);
router.post('/audio-translate', upload.single('file'), audioToTextController);
router.post('/analyse-image', analyzeImage);

export default router;