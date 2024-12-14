import type { UseQueryOptions } from '@tanstack/react-query';

export type CustomUseQueryOptions<T = unknown, E = Error> = Omit<UseQueryOptions<T, E>, 'queryKey'>;
