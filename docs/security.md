# Novixa Security & Isolation Standards

## Core Principles
1. **Server-Side API Proxy Isolation**: Gemini, Resend, and Firebase Admin credentials reside strictly in server environment variables.
2. **Zero Client Secret Exposure**: No private keys or secret tokens are bundled into Vite client builds or output in logs.
3. **Token Verification**: ID tokens generated on client Firebase Auth are verified server-side via `adminAuth.verifyIdToken()` before elevated transactions.
4. **Environment Sanitization**: `.env.local` is ignored in `.gitignore` to prevent secret commits.
