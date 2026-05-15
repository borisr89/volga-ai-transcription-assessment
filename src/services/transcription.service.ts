import { mockTranscribe } from "../adapters/mockTranscriber";
import { TranscriptionResult } from "../types/transcription.types";

export const transcribe = async (): Promise<TranscriptionResult> => {
    const result = await mockTranscribe();
    return result;
};
