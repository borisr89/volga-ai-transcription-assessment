import fs from "fs/promises";
import { Request, Response } from "express";
import { transcribe } from "../services/transcription.service";

export const transcribeAudio = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({
            error: "Audio file is required. Please upload a WAV or MP3 file using the 'file' field."
        });
    }

    try {
        const transcription = await transcribe();

        return res.status(200).json({
            message: "Audio processed successfully",
            file: {
                originalName: req.file.originalname,
                storedName: req.file.filename,
                mimeType: req.file.mimetype,
                size: req.file.size
            },
            transcription
        });
    } finally {
        await fs.unlink(req.file.path).catch(() => undefined);
    }
};
