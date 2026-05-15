import { Router } from "express";
import { uploadAudio } from "../middleware/upload.middleware";
import { transcribeAudio } from "../controllers/transcription.controller";

const router = Router();

router.post("/transcribe", uploadAudio.single("file"), transcribeAudio);

export default router;
