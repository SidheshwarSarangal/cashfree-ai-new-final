import { Router } from "express";
import { translateController, textToSpeechController, audioToTextController } from "../controllers/aiControllers.js";

const router = Router();

// Define chat route
router.post('/text-text', translateController);
router.post('/text-speech', textToSpeechController);
router.post('/audio-text', audioToTextController);

export default router;