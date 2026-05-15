import express from "express";
import cors from "cors";
import transcriptionRoutes from "./routes/transcription.routes";

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

export default app;
