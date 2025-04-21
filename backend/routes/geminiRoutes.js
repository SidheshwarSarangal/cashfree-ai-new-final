import { Router } from "express";
import { translateText } from "../controllers/geminiControllers.js";

const router = Router();

// Define chat route
router.post("/text-text", translateText);

export default router;
