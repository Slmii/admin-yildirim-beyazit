import { useRef } from 'react';

export const useFormSubmit = () => {
	const formRef = useRef<HTMLFormElement>(null);

	function submitter() {
		if (formRef.current) {
			formRef.current.requestSubmit();
		}
	}

	return { formRef, submitter };
};
