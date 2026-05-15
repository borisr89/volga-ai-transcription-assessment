import { MockTranscriber } from "../adapters/mockTranscriber";
import { TranscriptionResult } from "../types/transcription.types";

export const transcriber = new MockTranscriber();

export const transcribe = async (filePath: string): Promise<TranscriptionResult> => {
    return transcriber.transcribe(filePath);
}
