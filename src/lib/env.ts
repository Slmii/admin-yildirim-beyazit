import { z } from 'zod';

// Define the schema as an object with all of the env
// variables and their types
const envSchema = z.object({
	VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
	VITE_API_URL: z.string().min(1)
});

// Validate `process.env` against our schema
// and return the result
const envResult = envSchema.safeParse(import.meta.env);

if (!envResult.success) {
	throw new Error('There is an error with the server environment variables');
}

export const env = envResult.data;

export type Env = z.infer<typeof envSchema>;
