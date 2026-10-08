// Vitest runs outside the React Server Components bundler, where the real
// `server-only` package throws on import. The guard is for bundling; tests
// exercise the module's logic directly.
export {};
