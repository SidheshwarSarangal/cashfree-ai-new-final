import { Router } from "express";
import { translateController } from "../controllers/aiControllers.js";

const router = Router();

// Define chat route
router.post('/text-text', translateController);


export default router;
