'use client';

import React, { ReactNode, ErrorInfo } from 'react';
import { logger } from '../../lib/logger';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidMount() {
    // Initialize global promise rejection and window error handlers
    logger.initGlobalErrorHandlers();
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Centralized logging
    logger.logError(error, {
      // React types this as `string | null | undefined`; normalise the null
      // away so the log payload carries one "absent" representation.
      componentStack: errorInfo.componentStack ?? undefined,
      source: 'GlobalErrorBoundary',
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    });
    if (typeof window !== 'undefined') {
      window.location.hash = '#/ar/home';
    }
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, showDetails } = this.state;

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 dir-rtl font-arabic">
          <div className="max-w-xl w-full p-8 rounded-3xl border border-red-900/40 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-800/60 text-red-400 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            {/* Error Titles */}
            <div className="text-center space-y-2">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                حدث خطأ غير متوقع في الواجهة
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                قام المركز الهندسي لـ Novixa بحفظ سجل النظام تلقائياً للتحليل والإنقاذ التشغيلي.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-teal-900/20 active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>إعادة المحاولة / Retry</span>
              </button>

              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-2 active:scale-95 border border-slate-700"
              >
                <Home className="w-4 h-4" />
                <span>تحديث الصفحة</span>
              </button>

              {error && (
                <button
                  onClick={() => this.setState({ showDetails: !showDetails })}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-mono transition-all flex items-center gap-1.5 border border-slate-800"
                >
                  <Bug className="w-3.5 h-3.5" />
                  <span>{showDetails ? 'إخفاء التفاصيل' : 'تفاصيل الخطأ'}</span>
                </button>
              )}
            </div>

            {/* Expandable Technical Log */}
            {showDetails && error && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-red-900/30 text-left font-mono text-xs text-red-300/90 overflow-x-auto max-h-48 scrollbar-thin">
                <p className="font-bold text-red-400 mb-1">
                  [{error.name}]: {error.message}
                </p>
                {error.stack && (
                  <pre className="text-[10px] text-slate-400 leading-tight whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                )}
                {errorInfo?.componentStack && (
                  <pre className="text-[10px] text-slate-400 mt-2 whitespace-pre-wrap border-t border-slate-900 pt-2">
                    Component Stack:{errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
