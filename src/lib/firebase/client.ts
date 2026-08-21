import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { getClientEnv } from '../env';

let _cachedApp: FirebaseApp | null = null;
let _cachedAuth: Auth | null = null;
let _cachedDb: Firestore | null = null;

export function getClientApp(): FirebaseApp {
  if (_cachedApp) return _cachedApp;
  if (getApps().length > 0) {
    _cachedApp = getApp();
    return _cachedApp;
  }
  const env = getClientEnv();
  const firebaseConfig = {
    apiKey: env.apiKey || 'AIzaSyAMZeQN8vE8DuTdrFbc6ZTfCiUuAo1Ou1c',
    authDomain: env.authDomain || 'novixa-9f902.firebaseapp.com',
    projectId: env.projectId || 'novixa-9f902',
    storageBucket: env.storageBucket || 'novixa-9f902.firebasestorage.app',
    messagingSenderId: env.messagingSenderId || '737254921794',
    appId: env.appId || '1:737254921794:web:280d139bc2989282347fdb',
    measurementId: env.measurementId || 'G-8GVSC2YVNN',
  };
  try {
    _cachedApp = initializeApp(firebaseConfig);
  } catch {
    _cachedApp = getApps().length > 0 ? getApp() : ({} as FirebaseApp);
  }
  return _cachedApp;
}

export function getClientAuth(): Auth {
  if (_cachedAuth) return _cachedAuth;
  try {
    const clientApp = getClientApp();
    _cachedAuth = getAuth(clientApp);
  } catch (err) {
    console.warn('[Firebase Client] Auth init warning:', err);
  }
  return _cachedAuth as Auth;
}

export function getClientDb(): Firestore {
  if (_cachedDb) return _cachedDb;
  try {
    const clientApp = getClientApp();
    _cachedDb = getFirestore(clientApp);
  } catch (err) {
    console.warn('[Firebase Client] Firestore init warning:', err);
  }
  return _cachedDb as Firestore;
}

// Proxied exports to maintain compatibility without immediate crash
export const app = typeof window !== 'undefined' ? getClientApp() : ({} as FirebaseApp);
export const auth = typeof window !== 'undefined' ? getClientAuth() : ({} as Auth);
export const db = typeof window !== 'undefined' ? getClientDb() : ({} as Firestore);

/**
 * Safely tests Firebase Client connectivity to Firestore without leaving permanent data.
 */
export async function testFirebaseClientConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const clientDb = getClientDb();
    if (!clientDb) {
      return {
        success: false,
        message: 'Firestore client is not initialized in this environment.',
      };
    }

    const tempCol = collection(clientDb, '_dev_connectivity_test');
    const docRef = await addDoc(tempCol, {
      timestamp: new Date().toISOString(),
      test: 'client_connection',
    });

    // Cleanup immediately
    await deleteDoc(docRef);

    return {
      success: true,
      message: 'Client Firebase & Firestore read/write successfully verified.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Firebase Client connection failed.',
    };
  }
}
