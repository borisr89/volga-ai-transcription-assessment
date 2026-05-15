import { 
    Transcriber, 
    TranscriptionResult 
} from "../types/transcription.types";

export class MockTranscriber implements Transcriber {
    async transcribe(_filePath: string): Promise<TranscriptionResult> {
        return {
            transcript: 
                "The sun rises in the east and sets in the west. This simple fact has been observed by humans for thousands of years.",
            segments: [
                {
                    start: 0,
                    end: 3,
                    text: "The sun rises in the east and sets in the west."
                },
                {
                    start: 3,
                    end: 6,
                    text: "This simple fact has been observed by humans for thousands of years."
                }
            ],
            metadata: {
                provider: "mock",
                language: "en",
                durationSeconds: 6
            }
        };
    }
}
