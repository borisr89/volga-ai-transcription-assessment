import { describe, expect, it } from "@jest/globals";
import { transcribe } from "./transcription.service";

describe("transcription.service", () => {
    it("returns a valid transcription result with timestamped segments", async () => {
        const result = await transcribe("test-files/alloy.wav");

        expect(typeof result.transcript).toBe("string");
        expect(result.transcript.length).toBeGreaterThan(0);

        expect(Array.isArray(result.segments)).toBe(true);
        expect(result.segments.length).toBeGreaterThan(0);

        expect(result.segments[0]).toMatchObject({
            start: expect.any(Number),
            end: expect.any(Number),
            text: expect.any(String)
        });

        expect(result.metadata).toMatchObject({
            provider: expect.any(String),
            language: expect.any(String),
            durationSeconds: expect.any(Number)
        });
    });
});
