import { useState, useEffect } from 'react';

interface UsePerceivedLoadingOptions {
  initialDelay?: number;
  controlledLoading?: boolean;
}

/**
 * usePerceivedLoading provides an instant visual skeleton state during transitions,
 * enhancing perceived performance and eliminating abrupt blank flashes.
 */
export function usePerceivedLoading(
  dependencies: any[] = [],
  options: UsePerceivedLoadingOptions = {}
) {
  const { initialDelay = 380, controlledLoading } = options;
  const [internalLoading, setInternalLoading] = useState<boolean>(true);

  useEffect(() => {
    setInternalLoading(true);
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [...dependencies, initialDelay]);

  // If controlledLoading is explicitly passed (e.g., from network fetch), respect it;
  // otherwise fallback to internal perceived loading state.
  const isLoading = controlledLoading !== undefined ? controlledLoading : internalLoading;

  return {
    isLoading,
    setIsLoading: setInternalLoading,
  };
}
