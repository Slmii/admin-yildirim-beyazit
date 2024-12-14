import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode, RefObject } from 'react';
import { DefaultValues, FieldValues, Mode, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export interface FormProps<T extends FieldValues> {
	onAction: SubmitHandler<T>;
	defaultValues: DefaultValues<T> | (() => DefaultValues<T>);
	children?: ReactNode;
	schema?: z.ZodTypeAny;
	mode?: Mode;
	render?: (props: UseFormReturn<T>) => ReactNode;
	formRef?: RefObject<HTMLFormElement>;
	sx?: SxProps<Theme>;
}
