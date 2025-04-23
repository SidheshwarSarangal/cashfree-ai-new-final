import { Router } from "express";
import { translateController, textToSpeechController, upload, audioToTextController } from "../controllers/aiControllers.js";

const router = Router();

// Define chat route
router.post('/text-text', translateController);
router.post('/text-speech', textToSpeechController);
router.post('/audio-translate', upload.single('file'), audioToTextController);

export default router;