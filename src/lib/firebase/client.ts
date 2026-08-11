import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { getClientEnv } from '../env';

function initClientApp() {
  if (getApps().length > 0) {
    return getApp();
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
  return initializeApp(firebaseConfig);
}

// Initialize Client Firebase App once
export const app = initClientApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Safely tests Firebase Client connectivity to Firestore without leaving permanent data.
 */
export async function testFirebaseClientConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const tempCol = collection(db, '_dev_connectivity_test');
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
