import { Autocomplete, TextField, InputAdornment, Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import slugify from 'slugify';
import { SelectAutocompleteOption, SelectAutocompleteProps } from './SelectAutocomplete.types';
import React from 'react';
import { Icon } from '@/components/Icon/Icon.component';
import { useTranslation } from 'react-i18next';

export const SelectAutocomplete = ({
	name,
	label,
	options = [],
	required,
	disabled,
	autoFocus = false,
	isLoading = false,
	placeholder,
	fullWidth,
	startIcon,
	endIcon,
	startElement,
	endElement,
	size,
	onChange
}: SelectAutocompleteProps) => {
	const { t } = useTranslation();
	const { setValue: setFormValue, getValues } = useFormContext();

	const [value, setValue] = useState<SelectAutocompleteOption | null>(null);
	const [inputValue, setInputValue] = useState('');
	const defaultFormValue = getValues(name) as string;

	useEffect(() => {
		if (options.length) {
			// Find the option that match the given defaultvalue in the formContext
			const option = options.find(option => option.id === defaultFormValue);

			if (option) {
				// Set the option as the selected option
				setValue({
					id: option.id,
					label: option.label
				});
			} else {
				setValue(null);
			}

			// Set the selected option's name value in the input field
			if (defaultFormValue) {
				setInputValue(option?.label || '');
			}
		}
	}, [defaultFormValue, options]);

	return (
		<Controller
			name={name}
			rules={{
				required
			}}
			render={({ field, fieldState }) => (
				<Autocomplete
					value={value}
					clearOnBlur
					inputValue={inputValue}
					id={`${slugify(name)}-field`}
					options={options}
					openOnFocus={autoFocus}
					size={size}
					disabled={disabled}
					groupBy={option => option.groupBy ?? ''}
					getOptionLabel={option => option.label}
					isOptionEqualToValue={(option, value) => option.id === value.id}
					fullWidth={fullWidth}
					loading={isLoading}
					noOptionsText={t('labels.noOptions')}
					renderOption={(props, option) => (
						<Box {...props} component='li' key={option.id}>
							<Stack gap={1}>
								<Typography variant='body1'>{option.label}</Typography>
								{option.secondaryLabel && (
									<Typography variant='subtitle2' sx={{ opacity: 0.5 }}>
										{option.secondaryLabel}
									</Typography>
								)}
							</Stack>
						</Box>
					)}
					aria-required={required}
					renderInput={params => (
						<TextField
							placeholder={placeholder ?? t('labels.typeToSearch')}
							autoFocus={autoFocus}
							{...params}
							name={name}
							fullWidth
							label={label}
							error={Boolean(fieldState.error)}
							helperText={fieldState.error?.message}
							slotProps={{
								input: {
									...params.InputProps,
									startAdornment: startIcon ? (
										// We use `end` to get some more spacing on the left side
										<InputAdornment position='end'>
											<Icon icon={startIcon} />
										</InputAdornment>
									) : startElement ? (
										// We use `end` to get some more spacing on the left side
										<InputAdornment position='end'>
											{React.cloneElement(startElement)}
										</InputAdornment>
									) : (
										params.InputProps.startAdornment
									),
									endAdornment: endIcon ? (
										<InputAdornment
											position='end'
											sx={{
												position: 'absolute',
												right: 9
											}}
										>
											<Icon icon={endIcon} />
										</InputAdornment>
									) : endElement ? (
										<InputAdornment
											position='end'
											sx={{
												position: 'absolute',
												right: 9
											}}
										>
											{React.cloneElement(endElement)}
										</InputAdornment>
									) : (
										params.InputProps.endAdornment
									)
								}
							}}
						/>
					)}
					onChange={(_e, value) => {
						// Set value in the Autocomplete component
						setValue(value);
						// Set value in the formContext
						setFormValue(name, value ? value.id : value, { shouldValidate: true });

						onChange?.(value);
					}}
					onBlur={field.onBlur}
					onInputChange={(_e, value) => {
						setInputValue(value);
					}}
				/>
			)}
		/>
	);
};
