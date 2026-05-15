import { Router } from "express";

const router = Router();

router.get("/transcribe", (_, res) => {
    res.json({
        message: "Transcription route works"
    });
});

export default router;
