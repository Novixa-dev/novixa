/**
 * Centralized Environment Configuration & Validation Module
 * Separates public client variables from server-only secrets.
 * Ensures secret values are NEVER exposed or logged.
 */

export interface EnvValidationResult {
  isValid: boolean;
  isServer: boolean;
  missingClientVars: string[];
  missingServerVars: string[];
  summary: {
    hasFirebaseClient: boolean;
    hasFirebaseAdmin: boolean;
    hasGemini: boolean;
    hasResend: boolean;
  };
}

const getEnvVal = (key: string, fallback: string): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key] as string;
  }
  return fallback;
};

export const getClientEnv = () => ({
  apiKey: getEnvVal('NEXT_PUBLIC_FIREBASE_API_KEY', 'AIzaSyAMZeQN8vE8DuTdrFbc6ZTfCiUuAo1Ou1c'),
  authDomain: getEnvVal('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 'novixa-9f902.firebaseapp.com'),
  projectId: getEnvVal('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'novixa-9f902'),
  storageBucket: getEnvVal('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', 'novixa-9f902.firebasestorage.app'),
  messagingSenderId: getEnvVal('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '737254921794'),
  appId: getEnvVal('NEXT_PUBLIC_FIREBASE_APP_ID', '1:737254921794:web:280d139bc2989282347fdb'),
  measurementId: getEnvVal('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', 'G-8GVSC2YVNN'),
});

export const getServerEnv = () => {
  if (typeof window !== 'undefined') {
    throw new Error('SECURITY VIOLATION: getServerEnv() called in browser runtime.');
  }

  let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  privateKey = privateKey.replace(/\\n/g, '\n');

  return {
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID || 'novixa-9f902',
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
    firebasePrivateKey: privateKey,
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    novixaContactEmail: process.env.NOVIXA_CONTACT_EMAIL || 'ak01redwan@gmail.com',
  };
};

export function validateEnvironment(): EnvValidationResult {
  const isServer = typeof window === 'undefined';

  const requiredClient = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  const requiredServer = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'GEMINI_API_KEY',
    'RESEND_API_KEY',
    'RESEND_FROM_EMAIL',
    'NOVIXA_CONTACT_EMAIL',
  ];

  const missingClientVars = requiredClient.filter((key) => !process.env[key]);
  const missingServerVars = isServer ? requiredServer.filter((key) => !process.env[key]) : [];

  return {
    isValid: missingClientVars.length === 0 && (isServer ? missingServerVars.length === 0 : true),
    isServer,
    missingClientVars,
    missingServerVars,
    summary: {
      hasFirebaseClient: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      hasFirebaseAdmin: isServer ? !!process.env.FIREBASE_PRIVATE_KEY : false,
      hasGemini: isServer ? !!process.env.GEMINI_API_KEY : false,
      hasResend: isServer ? !!process.env.RESEND_API_KEY : false,
    },
  };
}
