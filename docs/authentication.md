# Firebase Authentication Architecture

## Client Authentication (`src/lib/firebase/client.ts`)

Novixa leverages Firebase Authentication for user identity management.

- **Initialization**: Configured with public `NEXT_PUBLIC_FIREBASE_*` parameters.
- **Provider**: Email/Password and Anonymous Auth for development testing.
- **Client Methods**: `signInAnonymously()`, `onAuthStateChanged()`, `signOut()`.

## Server Token Verification (`src/lib/firebase/admin.ts`)

Server-side routes verify client identity using the Firebase Admin SDK (`firebase-admin`).

### Verification Flow

1. Client acquires ID Token via `user.getIdToken()`.
2. Client sends token to `/api/auth/verify` via POST request payload or `Authorization` header.
3. Server executes `getAdminAuth().verifyIdToken(token)`.
4. Server returns verified UID, email, and authentication timestamp.

```typescript
// Server-Side Verification Snippet (server.ts)
const decodedToken = await getAdminAuth().verifyIdToken(token);
res.json({
  success: true,
  uid: decodedToken.uid,
  email: decodedToken.email,
  authTime: new Date(decodedToken.auth_time * 1000).toISOString(),
});
```

## Security Guarantees
- Client-side routes use authenticated state listeners.
- API endpoints do not rely solely on client claim headers; all elevated requests require Firebase Admin token validation.
