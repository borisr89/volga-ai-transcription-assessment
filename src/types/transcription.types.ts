export type TranscriptionSegment = {
    start: number;
    end: number;
    text: string;
};

export type TranscriptionResult = {
    transcript: string;
    segments: TranscriptionSegment[];
    metadata: {
        provider: string;
        language: string;
        durationSeconds: number;
    }
};

export interface Transcriber {
    transcribe(filePath: string): Promise<TranscriptionResult>;
};
