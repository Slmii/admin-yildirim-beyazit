import { useCallback, useEffect, useRef, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// Cancel the timeout if value changes (also on delay change or unmount)
			// This is how we prevent debounced value from updating if value is changed ...
			// .. within the delay period. Timeout gets cleared and restarted.
			return () => {
				clearTimeout(handler);
			};
		},
		[value, delay] // Only re-call effect if value or delay changes
	);

	return debouncedValue;
}

// Not sure how to type this any right now, accepting suggestions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedFunction<T extends (...args: any[]) => void>(func: T, delay: number): T {
	const timerIdRef = useRef<NodeJS.Timeout | null>(null);

	const debouncedFunction = useCallback(
		(...args: Parameters<T>) => {
			if (timerIdRef.current) {
				clearTimeout(timerIdRef.current);
			}

			timerIdRef.current = setTimeout(() => {
				func(...args);
			}, delay);
		},
		[func, delay]
	) as T;

	return debouncedFunction;
}
