# AI Transcription Pipeline Assessment

## Overview

This project implements a simple audio transcription pipeline using Node.js and TypeScript.

The API:

- accepts audio uploads (WAV / MP3)
- validates input files
- processes transcription using a mock speech-to-text adapter
- returns transcripts with timestamped segments
- performs temporary file cleanup after processing

The implementation focuses on engineering decisions and extensibility rather than model training.

---

## Tech Stack

- Node.js
- TypeScript
- Express
- Multer
- Jest
- Mock Speech-to-Text Adapter

---

## Project Structure

```txt
src/
controllers/
services/
middleware/
adapters/
routes/
types/
```

---

## Architecture Overview

The application follows a layered structure:

- Route layer handles HTTP concerns
- Middleware validates uploads
- Controller orchestrates request flow
- Service layer contains transcription logic
- Adapter layer abstracts speech-to-text providers

This separation makes future provider replacement easier without changing API behavior.

---

## API Endpoint

### POST /api/transcribe

Accepts:

multipart/form-data

Field:

```txt
file
```

Supported:

```txt
.wav
.mp3
```

Response example:

```json
{
  "message": "Audio processed successfully",
  "file": {
    "originalName": "alloy.wav",
    "storedName": "file-123.wav",
    "mimeType": "audio/wave",
    "size": 222798
  },
  "transcription": {
    "transcript":
      "The sun rises in the east and sets in the west. This simple fact has been observed by humans for thousands of years.",

    "segments": [
      {
        "start": 0,
        "end": 3,
        "text":
          "The sun rises in the east and sets in the west."
      },
      {
        "start": 3,
        "end": 6,
        "text":
          "This simple fact has been observed by humans for thousands of years."
      }
    ],

    "metadata": {
      "provider": "mock",
      "language": "en",
      "durationSeconds": 6
    }
  }
}
```

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/api/transcribe \
  -F "file=@test-files/alloy.wav"
```

This example uploads a WAV file and returns the transcription response with timestamped segments.

---

## Design Decisions

### Why mock transcription?

The assessment explicitly allows mocked data.

The mock adapter was used to focus on:

- API design
- validation
- separation of concerns
- timestamp formatting
- extensibility

A production provider such as Whisper or Deepgram could replace the adapter.

---

### Why temporary file cleanup?

Uploaded files are treated as temporary processing artifacts.

Files are deleted after processing to avoid:

- storage growth
- orphaned files
- privacy issues

---

## Assumptions

The implementation assumes:

- one audio file per request
- synchronous processing
- local execution environment
- mocked transcription responses

These assumptions were intentionally chosen to keep the assessment focused and simple.

---

## Tradeoffs

The implementation intentionally uses synchronous processing and local temporary storage.

Benefits:

- simpler architecture
- easier local execution
- lower infrastructure complexity

Tradeoffs:

- request time depends on transcription duration
- unsuitable for large-scale workloads
- local storage is not ideal for distributed systems

Production systems would likely use queues and object storage.

---

## Validation Strategy

The API validates:

- MIME type
- file extension
- upload size
- multipart file presence

Production systems should additionally inspect actual audio headers and codecs.

---

## Error Handling

Implemented:

- invalid file type
- missing file
- oversized uploads
- structured JSON errors

---

## Failure Handling

Current implementation handles:

- invalid file type
- missing file
- upload failures

Temporary uploaded files are removed after processing to avoid orphaned artifacts.

---

## Testing

Implemented:

- transcription service test
- transcript structure validation
- timestamp validation

Run:

```bash
npm test
```

---

## Production Improvements

Future improvements:

- queue processing (BullMQ / RabbitMQ)
- retries with exponential backoff
- S3 storage
- PostgreSQL persistence
- async jobs
- status polling
- chunking long audio files
- real STT provider
- observability/logging
- rate limiting

---

## Scaling Strategy

Production flow:

Upload -> Store -> Queue Job -> Worker -> Transcription -> Persist Result -> Client Polling/Webhook

---

## Observability

Production systems would include:

- structured logging
- request correlation IDs
- latency metrics
- failed job monitoring

---

## AI Usage

AI tools were used as engineering assistants for:

- reviewing edge cases
- validating architecture decisions
- suggesting production considerations

Implementation and design decisions were written and validated manually.

---

## Run locally

Requires:

```txt
Node.js >= 18
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Tests:

```bash
npm test
```
