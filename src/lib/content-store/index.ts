import { MemoryContentStore } from './memory-store';
import type { ContentStore } from './types';

export * from './types';
export { MemoryContentStore } from './memory-store';

const globalForContentStore = globalThis as unknown as { __novixaContentStore?: ContentStore | null };

/**
 * The configured content & catalog store.
 * Initialized as a singleton on globalThis to persist throughout runtime.
 */
export function getContentStore(): ContentStore {
  if (globalForContentStore.__novixaContentStore) {
    return globalForContentStore.__novixaContentStore;
  }

  // MemoryContentStore seeds directly from existing data.ts and faq.ts.
  const store = new MemoryContentStore();
  globalForContentStore.__novixaContentStore = store;
  return store;
}
