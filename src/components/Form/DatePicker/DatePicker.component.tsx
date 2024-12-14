import { Controller, useFormContext } from 'react-hook-form';
import { DatePickerProps } from './DatePicker.types';
import { DateField } from '@mui/x-date-pickers/DateField';
import Stack from '@mui/material/Stack';

export const DatePicker = ({
	name,
	label,
	onChange,
	fullWidth,
	required = false,
	disabled = false
}: DatePickerProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required
			}}
			render={({ field, fieldState }) => (
				<Stack
					direction='column'
					spacing={0.25}
					sx={{
						position: 'relative',
						width: fullWidth ? '100%' : undefined
					}}
				>
					<DateField
						{...field}
						required={required}
						format='dd-MM-yyyy'
						onChange={date => {
							field.onChange(date ? new Date(date) : null);
							onChange?.(date ? new Date(date) : null);
						}}
						disabled={disabled}
						label={label}
						slotProps={{
							textField: {
								name,
								error: !!fieldState.error
							},
							input: {
								error: !!fieldState.error
							},
							inputLabel: {
								error: !!fieldState.error
							}
						}}
						helperText={fieldState.error?.message}
					/>
				</Stack>
			)}
		/>
	);
};
