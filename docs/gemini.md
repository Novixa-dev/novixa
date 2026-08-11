# Gemini AI Integration (`src/lib/ai/gemini.ts`)

## Standard Architecture
- Uses the modern `@google/genai` TypeScript SDK.
- Configured with `GEMINI_API_KEY` exclusively on the server.
- Uses alias `gemini-3.6-flash`.
- Exposed via `POST /api/ai/test` endpoint to isolate secret credentials.
