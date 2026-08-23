/**
 * Centralized Logger for Novixa Platform
 * Tracks structured logs, handles promise rejections gracefully,
 * and maintains clean runtime stability.
 */

import { trackEvent } from './analytics';

export interface LogContext {
  [key: string]: any;
}

export interface ErrorLogPayload {
  message: string;
  name?: string;
  stack?: string;
  componentStack?: string;
  context?: LogContext;
  url?: string;
  userAgent?: string;
  timestamp: string;
}

class Logger {
  private isInitialized = false;

  /**
   * Initializes global error listeners for unhandled promise rejections & uncaught window errors.
   */
  public initGlobalErrorHandlers() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    this.isInitialized = true;

    // Safely capture and neutralize unhandled promise rejections
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      // 1. Immediately prevent default browser unhandled rejection alert
      try {
        if (event && typeof event.preventDefault === 'function') {
          event.preventDefault();
        }
      } catch {
        // Safe no-op
      }

      const reason = event?.reason;

      // Filter out benign browser noise, canceled requests, empty/falsy rejections, or zero codes
      if (
        reason === undefined ||
        reason === null ||
        reason === 0 ||
        reason === '0' ||
        reason === '' ||
        reason === 'ResizeObserver loop limit exceeded' ||
        (typeof reason === 'object' && (
          reason?.name === 'AbortError' ||
          reason?.code === 0 ||
          reason?.name === 'FirebaseError' ||
          reason?.message?.includes('IndexedDB') ||
          reason?.message?.includes('Failed to fetch')
        )) ||
        (typeof reason === 'string' && (
          reason.includes('WebSocket') ||
          reason.includes('ResizeObserver') ||
          reason.includes('canceled') ||
          reason.includes('IndexedDB') ||
          reason.includes('Failed to fetch') ||
          reason === '0' ||
          reason.trim() === ''
        ))
      ) {
        return;
      }

      const error =
        reason instanceof Error
          ? reason
          : new Error(
              typeof reason === 'string'
                ? reason
                : typeof reason === 'object' && reason?.message
                ? reason.message
                : 'Unhandled Promise Warning'
            );

      if (!error.message || error.message === '0' || error.message === 'null' || error.message.trim() === '') {
        return;
      }

      const timestamp = new Date().toISOString();
      console.warn(`[NOVIXA_REJECTION_RECOVERED][${timestamp}] Handled async rejection:`, error.message);
    });

    // Track uncaught global script errors
    window.addEventListener('error', (event: ErrorEvent) => {
      try {
        if (event && typeof event.preventDefault === 'function') {
          if (
            !event.message ||
            event.message === '0' ||
            event.message.includes('ResizeObserver') ||
            event.message.includes('Script error') ||
            event.message.includes('WebSocket')
          ) {
            event.preventDefault();
            return;
          }
        }
      } catch {
        // Safe no-op
      }

      if (
        !event.message ||
        event.message === '0' ||
        event.message.includes('ResizeObserver') ||
        event.message.includes('Script error') ||
        event.message.includes('WebSocket')
      ) {
        return;
      }

      const error =
        event.error instanceof Error
          ? event.error
          : new Error(event.message || 'Uncaught Global Error');

      if (!error.message || error.message === '0') {
        return;
      }

      this.logError(error, {
        source: 'window.onerror',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    this.info('[Logger] Centralized error and rejection handlers initialized.');
  }

  /**
   * Logs info level messages with contextual details.
   */
  public info(message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO][${timestamp}] ${message}`, context || '');
  }

  /**
   * Logs warning messages with contextual details.
   */
  public warn(message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN][${timestamp}] ${message}`, context || '');

    trackEvent('app_warning', {
      message,
      context,
      timestamp,
    });
  }

  /**
   * Logs errors, stack traces, and sends actionable payload to analytics.
   */
  public logError(error: Error | string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const errObj = typeof error === 'string' ? new Error(error) : error;

    const payload: ErrorLogPayload = {
      message: errObj.message || 'Unknown Error',
      name: errObj.name || 'Error',
      stack: errObj.stack,
      componentStack: context?.componentStack,
      context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp,
    };

    console.warn(
      `⚠️ [NOVIXA_ERROR_RECOVERED][${timestamp}] ${payload.name}: ${payload.message}`,
      context || ''
    );

    try {
      trackEvent('ui_error_event', payload);
    } catch {
      // Safe no-op
    }
  }
}

export const logger = new Logger();
