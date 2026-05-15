import multer from "multer";
import path from "path";

const allowedMimeTypes = [
    "audio/wav",
    "audio/x-wav",
    "audio/wave",
    "audio/vnd.wave",
    "audio/mpeg",
    "audio/mp3",
    "application/octet-stream"
];

const allowedExtensions = [".wav", ".mp3"];

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path.extname(file.originalname);

        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    }
});

export const uploadAudio = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024
    },
    fileFilter: (_req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();

        const isAllowedMimeType = allowedMimeTypes.includes(file.mimetype);
        const isAllowedExtension = allowedExtensions.includes(extension);

        if (!isAllowedMimeType || !isAllowedExtension) {
            cb(new Error("Invalid audio format. Only WAV and MP3 files are supported."));
            return;
        }

        cb(null, true);
    }
});
