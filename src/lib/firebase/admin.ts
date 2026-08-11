import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getServerEnv } from '../env';

if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: firebase/admin imported in browser bundle.');
}

export function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  const serverEnv = getServerEnv();

  if (!serverEnv.firebaseClientEmail || !serverEnv.firebasePrivateKey) {
    throw new Error('Firebase Admin credentials (FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY) are missing in server environment.');
  }

  return initializeApp({
    credential: cert({
      projectId: serverEnv.firebaseProjectId,
      clientEmail: serverEnv.firebaseClientEmail,
      privateKey: serverEnv.firebasePrivateKey,
    }),
  });
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}

/**
 * Server Connectivity & Auth Verification Helper for Firestore
 */
export async function testAdminConnectivity() {
  try {
    const adminDb = getAdminDb();
    const testRef = adminDb.collection('_dev_connectivity_test').doc('admin_ping');
    await testRef.set({
      timestamp: FieldValue.serverTimestamp(),
      source: 'firebase_admin_sdk',
    });

    const snapshot = await testRef.get();
    const dataExists = snapshot.exists;

    // Immediate cleanup
    await testRef.delete();

    return {
      success: dataExists,
      message: 'Firebase Admin SDK initialized and Firestore read/write/delete verified.',
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Firebase Admin SDK initialization failed.',
    };
  }
}
