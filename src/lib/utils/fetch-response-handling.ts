export const responseHandling = async <T>(response: Response): Promise<T> => {
	if (!response.ok) {
		const errorResponse = await response.json();
		throw new Error(errorResponse.message);
	}

	return response.json() as T;
};
