import { describe, expect, it } from "@jest/globals";
import { transcribe } from "./transcription.service";

describe("transcription.service", () => {
    it("returns transcript with timestamped segments", async () => {
        const result = await transcribe();

        expect(result.transcript).toContain("The sun rises in the east");
        expect(result.segments).toHaveLength(2);
        expect(result.segments[0]).toEqual({
            start: 0,
            end: 3,
            text: "The sun rises in the east and sets in the west."
        });
        expect(result.metadata.provider).toBe("mock");
    });
});
