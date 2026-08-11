# Firebase Integration Architecture

## Client Integration (`src/lib/firebase/client.ts`)
- Initialized once using `NEXT_PUBLIC_FIREBASE_*` configuration.
- Provides `auth` and `db` (Firestore).
- Supports client-side authentication and isolated Firestore transactions.

## Server Integration (`src/lib/firebase/admin.ts`)
- Utilizes `firebase-admin` SDK.
- Private keys with escaped newlines (`\n`) are formatted dynamically.
- Used in `/api/firebase/test` and `/api/auth/verify` for server-side token validation and secure database operations.
