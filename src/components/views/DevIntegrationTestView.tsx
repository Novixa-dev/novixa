import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Bot, 
  Mail, 
  Key, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Play, 
  Terminal, 
  AlertTriangle,
  Lock,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { validateEnvironment } from '../../lib/env';
import { testFirebaseClientConnection, auth } from '../../lib/firebase/client';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

interface TestResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
  timestamp?: string;
}

export function DevIntegrationTestView() {
  const { t, language } = useLanguage();

  // Env Status
  const [envStatus, setEnvStatus] = useState<any>(null);

  // Test states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authTest, setAuthTest] = useState<TestResult>({ status: 'idle' });
  const [tokenVerifyTest, setTokenVerifyTest] = useState<TestResult>({ status: 'idle' });
  const [clientFirestoreTest, setClientFirestoreTest] = useState<TestResult>({ status: 'idle' });
  const [adminFirestoreTest, setAdminFirestoreTest] = useState<TestResult>({ status: 'idle' });
  const [aiPrompt, setAiPrompt] = useState('Say hello from Novixa Platform Engine in one concise sentence.');
  const [aiTest, setAiTest] = useState<TestResult>({ status: 'idle' });
  const [emailTest, setEmailTest] = useState<TestResult>({ status: 'idle' });
  const [isSuiteRunning, setIsSuiteRunning] = useState(false);

  // Load environment & Auth listener on mount
  useEffect(() => {
    fetchEnvStatus();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchEnvStatus = async () => {
    try {
      const res = await fetch('/api/env/status');
      const data = await res.json();
      if (data.success) {
        setEnvStatus(data.envStatus);
      } else {
        setEnvStatus(validateEnvironment());
      }
    } catch {
      setEnvStatus(validateEnvironment());
    }
  };

  // 1. Firebase Auth Client Test
  const runAuthClientTest = async () => {
    setAuthTest({ status: 'loading' });
    try {
      const cred = await signInAnonymously(auth);
      setAuthTest({
        status: 'success',
        data: {
          uid: cred.user.uid,
          isAnonymous: cred.user.isAnonymous,
          providerId: cred.user.providerId || 'firebase_anon',
        },
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err: any) {
      setAuthTest({
        status: 'error',
        error: err?.message || 'Anonymous auth failed.',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  // 2. Token Verification Test (Server-side via Admin SDK)
  const runTokenVerifyTest = async () => {
    if (!auth.currentUser) {
      setTokenVerifyTest({
        status: 'error',
        error: 'Please sign in first via the Auth card to obtain an ID token.',
        timestamp: new Date().toLocaleTimeString(),
      });
      return;
    }

    setTokenVerifyTest({ status: 'loading' });
    try {
      const token = await auth.currentUser.getIdToken(true);
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      });
      const data = await res.json();
      if (data.success) {
        setTokenVerifyTest({
          status: 'success',
          data,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        setTokenVerifyTest({
          status: 'error',
          error: data.error || 'Server token verification failed.',
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err: any) {
      setTokenVerifyTest({
        status: 'error',
        error: err?.message || 'Token verification request failed.',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  // 3. Client Firestore Test
  const runClientFirestoreTest = async () => {
    setClientFirestoreTest({ status: 'loading' });
    const result = await testFirebaseClientConnection();
    if (result.success) {
      setClientFirestoreTest({
        status: 'success',
        data: { message: result.message },
        timestamp: new Date().toLocaleTimeString(),
      });
    } else {
      setClientFirestoreTest({
        status: 'error',
        error: result.message,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  // 4. Admin Firestore Test
  const runAdminFirestoreTest = async () => {
    setAdminFirestoreTest({ status: 'loading' });
    try {
      const res = await fetch('/api/firebase/test', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setAdminFirestoreTest({
          status: 'success',
          data,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        setAdminFirestoreTest({
          status: 'error',
          error: data.error || 'Admin Firestore test failed.',
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err: any) {
      setAdminFirestoreTest({
        status: 'error',
        error: err?.message || 'Admin Firestore API request failed.',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  // 5. Gemini AI Test
  const runAiTest = async () => {
    setAiTest({ status: 'loading' });
    try {
      const res = await fetch('/api/ai/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (data.success) {
        setAiTest({
          status: 'success',
          data,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        setAiTest({
          status: 'error',
          error: data.error || 'Gemini AI request failed.',
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err: any) {
      setAiTest({
        status: 'error',
        error: err?.message || 'Gemini AI test failed.',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  // 6. Resend Email Test
  const runEmailTest = async () => {
    setEmailTest({ status: 'loading' });
    try {
      const res = await fetch('/api/email/test', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setEmailTest({
          status: 'success',
          data,
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        setEmailTest({
          status: 'error',
          error: data.error || 'Resend Email dispatch failed.',
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } catch (err: any) {
      setEmailTest({
        status: 'error',
        error: err?.message || 'Resend Email test request failed.',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  // Run full E2E Suite
  const runFullSuite = async () => {
    setIsSuiteRunning(true);
    await runAuthClientTest();
    await runTokenVerifyTest();
    await runClientFirestoreTest();
    await runAdminFirestoreTest();
    await runAiTest();
    await runEmailTest();
    setIsSuiteRunning(false);
  };

  return (
    <div className="py-12 bg-slate-950 min-h-screen text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Novixa Engineering Sandbox
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Full End-to-End Integration Verification Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time server-side and client-side validation suite for Firebase Auth/Firestore, Gemini AI SDK, and Resend Email Services using temporary development credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runFullSuite}
              disabled={isSuiteRunning}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/30 transition duration-200 disabled:opacity-50 cursor-pointer"
            >
              {isSuiteRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              {isSuiteRunning ? 'Executing E2E Suite...' : 'Run Full E2E Test Suite'}
            </button>
          </div>
        </div>

        {/* Temporary Dev Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-semibold text-amber-300">Temporary Testing Environment Notice:</span> All credentials loaded via <code className="bg-amber-950/60 px-1.5 py-0.5 rounded text-amber-300 border border-amber-500/30 font-mono">.env.local</code> are temporary dev credentials. Private keys and API tokens are processed strictly server-side and isolated from public client bundles.
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Environment Variables Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <Key className="w-5 h-5 text-indigo-400" />
                  Environment & Secrets Isolation
                </div>
                <button 
                  onClick={fetchEnvStatus}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reload
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Firebase Web App Client API Key</span>
                  {envStatus?.summary?.hasFirebaseClient ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Configured (Public)</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Missing</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Firebase Admin Private Key</span>
                  {envStatus?.summary?.hasFirebaseAdmin ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Isolated (Server)</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Missing</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Gemini AI Key</span>
                  {envStatus?.summary?.hasGemini ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Isolated (Server)</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Missing</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Resend Email Key</span>
                  {envStatus?.summary?.hasResend ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Isolated (Server)</span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Missing</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-500" /> Zero Browser Secret Exposure</span>
              <span>Single Config: <code className="text-slate-300">.env.local</code></span>
            </div>
          </div>

          {/* 2. Firebase Auth & Token Verification Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  Firebase Auth & Admin Verification
                </div>
                {currentUser && (
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                    UID: {currentUser.uid.slice(0, 8)}...
                  </span>
                )}
              </div>

              <p className="text-slate-400 text-xs mb-4">
                Tests client sign-in token generation and server-side verification using Firebase Admin SDK (<code className="text-slate-300">/api/auth/verify</code>).
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={runAuthClientTest}
                  disabled={authTest.status === 'loading'}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition border border-slate-700 cursor-pointer disabled:opacity-50"
                >
                  {authTest.status === 'loading' ? 'Signing in...' : '1. Sign In (Client Auth)'}
                </button>

                <button
                  onClick={runTokenVerifyTest}
                  disabled={tokenVerifyTest.status === 'loading'}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  {tokenVerifyTest.status === 'loading' ? 'Verifying...' : '2. Verify Token on Server'}
                </button>
              </div>

              {/* Status Output */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs max-h-36 overflow-y-auto">
                {tokenVerifyTest.status === 'success' ? (
                  <div className="text-emerald-400">
                    <p className="font-semibold">✓ Server Verified Firebase Auth Token:</p>
                    <pre className="text-[11px] text-slate-300 mt-1 whitespace-pre-wrap">{JSON.stringify(tokenVerifyTest.data, null, 2)}</pre>
                  </div>
                ) : authTest.status === 'success' ? (
                  <div className="text-emerald-400">
                    <p className="font-semibold">✓ Client Auth Signed In:</p>
                    <pre className="text-[11px] text-slate-300 mt-1 whitespace-pre-wrap">{JSON.stringify(authTest.data, null, 2)}</pre>
                  </div>
                ) : authTest.status === 'error' || tokenVerifyTest.status === 'error' ? (
                  <div className="text-rose-400">
                    <p className="font-semibold">✗ Auth Error:</p>
                    <p className="text-slate-300 mt-1">{authTest.error || tokenVerifyTest.error}</p>
                  </div>
                ) : (
                  <span className="text-slate-500">Awaiting authentication test execution...</span>
                )}
              </div>
            </div>
          </div>

          {/* 3. Firestore Connection Test Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <Database className="w-5 h-5 text-amber-400" />
                  Firestore Read/Write Integration
                </div>
              </div>

              <p className="text-slate-400 text-xs mb-4">
                Executes temporary isolated write-read-delete transactions via both Client SDK and Server Firebase Admin SDK.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={runClientFirestoreTest}
                  disabled={clientFirestoreTest.status === 'loading'}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition border border-slate-700 cursor-pointer disabled:opacity-50"
                >
                  {clientFirestoreTest.status === 'loading' ? 'Testing Client...' : 'Test Client Firestore'}
                </button>

                <button
                  onClick={runAdminFirestoreTest}
                  disabled={adminFirestoreTest.status === 'loading'}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs px-3.5 py-2 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  {adminFirestoreTest.status === 'loading' ? 'Testing Admin...' : 'Test Admin Firestore (/api/firebase/test)'}
                </button>
              </div>

              {/* Status Output */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs max-h-36 overflow-y-auto">
                {adminFirestoreTest.status === 'success' || clientFirestoreTest.status === 'success' ? (
                  <div className="text-emerald-400">
                    {clientFirestoreTest.status === 'success' && <p>✓ Client Firestore: {clientFirestoreTest.data?.message}</p>}
                    {adminFirestoreTest.status === 'success' && <p>✓ Admin Firestore: {adminFirestoreTest.data?.message}</p>}
                  </div>
                ) : adminFirestoreTest.status === 'error' || clientFirestoreTest.status === 'error' ? (
                  <div className="text-rose-400">
                    <p className="font-semibold">✗ Firestore Error:</p>
                    <p className="text-slate-300 mt-1">{adminFirestoreTest.error || clientFirestoreTest.error}</p>
                  </div>
                ) : (
                  <span className="text-slate-500">Awaiting Firestore connectivity test...</span>
                )}
              </div>
            </div>
          </div>

          {/* 4. Gemini AI SDK Integration Test Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  Gemini AI Server Service (@google/genai)
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  gemini-3.6-flash
                </span>
              </div>

              <p className="text-slate-400 text-xs mb-3">
                Proxies AI generation via server endpoint <code className="text-slate-300">POST /api/ai/test</code>.
              </p>

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Enter test prompt..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={runAiTest}
                  disabled={aiTest.status === 'loading'}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition cursor-pointer disabled:opacity-50 w-full"
                >
                  {aiTest.status === 'loading' ? 'Generating with Gemini...' : 'Execute Gemini AI Request'}
                </button>
              </div>

              {/* Status Output */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs max-h-36 overflow-y-auto">
                {aiTest.status === 'success' ? (
                  <div>
                    <span className="text-emerald-400 font-semibold">✓ Gemini AI Response Received:</span>
                    <p className="text-slate-200 mt-1 italic border-l-2 border-cyan-500 pl-2 py-1 bg-slate-900/50 rounded-r">
                      "{aiTest.data?.response}"
                    </p>
                    <div className="text-[10px] text-slate-500 mt-2 flex justify-between">
                      <span>Model: {aiTest.data?.model}</span>
                      <span>Time: {aiTest.timestamp}</span>
                    </div>
                  </div>
                ) : aiTest.status === 'error' ? (
                  <div className="text-rose-400">
                    <p className="font-semibold">✗ Gemini AI Error:</p>
                    <p className="text-slate-300 mt-1">{aiTest.error}</p>
                  </div>
                ) : (
                  <span className="text-slate-500">Awaiting Gemini AI test execution...</span>
                )}
              </div>
            </div>
          </div>

          {/* 5. Resend Email Integration Test Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <Mail className="w-5 h-5 text-purple-400" />
                  Resend Email Gateway Service
                </div>
                <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded border border-purple-800">
                  Target: ak01redwan@gmail.com
                </span>
              </div>

              <p className="text-slate-400 text-xs mb-4">
                Dispatches an HTML integration confirmation message via server endpoint <code className="text-slate-300">POST /api/email/test</code> using <code className="text-slate-300">onboarding@resend.dev</code>.
              </p>

              <div className="flex items-center justify-between gap-4 mb-4">
                <button
                  onClick={runEmailTest}
                  disabled={emailTest.status === 'loading'}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition cursor-pointer disabled:opacity-50"
                >
                  {emailTest.status === 'loading' ? 'Dispatching Test Email...' : 'Send Test Email via Resend (/api/email/test)'}
                </button>

                <div className="text-xs text-slate-400 font-mono hidden sm:block">
                  From: <code className="text-slate-200">onboarding@resend.dev</code>
                </div>
              </div>

              {/* Status Output */}
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs">
                {emailTest.status === 'success' ? (
                  <div className="text-emerald-400">
                    <p className="font-semibold">✓ Resend Email Dispatched Successfully!</p>
                    <div className="text-slate-300 mt-1 space-y-1">
                      <p>Email ID: <code className="text-purple-300">{emailTest.data?.emailId}</code></p>
                      <p>Recipient: <code className="text-slate-200">{emailTest.data?.recipient}</code></p>
                      <p>Timestamp: {emailTest.timestamp}</p>
                    </div>
                  </div>
                ) : emailTest.status === 'error' ? (
                  <div className="text-rose-400">
                    <p className="font-semibold">✗ Resend Email Error:</p>
                    <p className="text-slate-300 mt-1">{emailTest.error}</p>
                  </div>
                ) : (
                  <span className="text-slate-500">Awaiting Resend email test execution...</span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer / Instruction note */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Novixa Technologies — Internal Development Integration Suite</span>
          <span className="font-mono text-slate-400">Route: #/en/dev_integration</span>
        </div>

      </div>
    </div>
  );
}
