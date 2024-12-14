export const lineClampVars = (lineClamp?: number): React.CSSProperties => {
	return {
		display: lineClamp ? '-webkit-box' : undefined,
		WebkitLineClamp: lineClamp,
		WebkitBoxOrient: lineClamp ? 'vertical' : undefined,
		overflow: lineClamp ? 'hidden' : undefined
	};
};

export const wordBreakVars = (wordBreak?: boolean): React.CSSProperties => {
	return {
		wordBreak: wordBreak ? 'break-word' : undefined,
		whiteSpace: wordBreak ? 'pre-wrap' : undefined
	};
};
