import express from "express";
import cors from "cors";
import transcriptionRoutes from "./routes/transcription.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
    res.status(200).json({
        status: "Ok",
        message: "Server is running"
    });
});

app.use("/api", transcriptionRoutes);

app.use(errorHandler);

export default app;
