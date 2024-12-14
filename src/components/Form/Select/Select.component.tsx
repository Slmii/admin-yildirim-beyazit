import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';
import { SelectProps, StandaloneSelectProps } from './Select.types';
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export const StandaloneSelect = React.forwardRef<HTMLInputElement, StandaloneSelectProps>(
	({ name, value, error, label, options = [], onChange, required, fullWidth, disabled = false, helperText }, ref) => {
		const slugified = `select-${slugify(name)}`;
		const labelId = `${slugified}-label`;

		return (
			<FormControl error={!!error} fullWidth={fullWidth} disabled={disabled}>
				<InputLabel id={labelId}>{label}</InputLabel>
				<MuiSelect
					labelId={labelId}
					required={required}
					label={label}
					error={Boolean(error)}
					MenuProps={{
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'left'
						},
						transformOrigin: {
							vertical: 'top',
							horizontal: 'left'
						}
					}}
					id={slugified}
					variant='outlined'
					name={name}
					value={value}
					onChange={onChange}
					inputRef={ref}
				>
					{options.map(option => (
						<MenuItem key={option.id} value={option.id} disabled={option.disabled}>
							{option.label}
						</MenuItem>
					))}
				</MuiSelect>
				{error || helperText ? <FormHelperText error={!!error}>{error || helperText}</FormHelperText> : null}
			</FormControl>
		);
	}
);

StandaloneSelect.displayName = 'StandaloneSelect';

export const Select = (props: SelectProps) => {
	return (
		<Controller
			name={props.name}
			rules={{
				required: props.required
			}}
			render={({ field, fieldState }) => {
				return (
					<StandaloneSelect
						{...props}
						{...field}
						error={fieldState.error?.message}
						onChange={e => {
							field.onChange(e);
							props.onChange?.(e.target.value as string);
						}}
					/>
				);
			}}
		/>
	);
};
