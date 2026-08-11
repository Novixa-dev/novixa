# Local Development & Manual Integration Testing

## Getting Started
1. Ensure `.env.local` is present in root with temporary development credentials.
2. Launch dev server: `npm run dev`.
3. Open integration testing dashboard: navigate to `#/en/dev_integration` or `#/ar/dev_integration`.

## Manual Test Verification Steps
1. **Environment Overview**: Click "Reload" to confirm all 4 service keys are present.
2. **Auth & Token Verification**: Click "1. Sign In (Client Auth)" then "2. Verify Token on Server".
3. **Firestore Read/Write**: Click "Test Client Firestore" and "Test Admin Firestore".
4. **Gemini AI**: Click "Execute Gemini AI Request" to verify AI greeting generation.
5. **Resend Email**: Click "Send Test Email via Resend" to verify delivery to `ak01redwan@gmail.com`.
6. **Full Suite**: Click "Run Full E2E Test Suite" to execute all tests automatically in sequence.
