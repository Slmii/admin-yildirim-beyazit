import { zodResolver } from '@hookform/resolvers/zod';
import FormGroup from '@mui/material/FormGroup';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { FormProps } from './Form.types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

const StyledForm = styled('form')({
	width: '100%'
});

export function Form<T extends FieldValues>({
	children,
	onAction,
	schema,
	defaultValues,
	mode = 'onBlur',
	render,
	formRef,
	sx
}: FormProps<T>) {
	const form = useForm<T>({
		resolver: schema ? zodResolver(schema) : undefined,
		defaultValues: typeof defaultValues === 'function' ? defaultValues() : defaultValues,
		mode
	});

	useEffect(() => {
		if (Object.keys(form.formState.errors).length > 0) {
			console.log(form.formState.errors);
		}
	}, [form.formState.errors]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<FormProvider {...form}>
				<StyledForm ref={formRef} noValidate sx={sx} onSubmit={form.handleSubmit(onAction)}>
					<FormGroup
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 3
						}}
					>
						{render ? render(form) : children}
					</FormGroup>
				</StyledForm>
			</FormProvider>
		</LocalizationProvider>
	);
}
