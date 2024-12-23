import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup, CheckboxProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import slugify from 'slugify';

export const StandaloneCheckbox = ({
	label,
	name,
	checked,
	disabled,
	onChange,
	...props
}: {
	name: string;
	checked: boolean;
	label?: string;
	disabled?: boolean;
	onChange?: (checked: boolean) => void;
} & CheckboxProps) => {
	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<MuiCheckbox
						inputProps={{ 'aria-labelledby': `${slugify(name)}-checkbox` }}
						disabled={disabled}
						checked={checked}
						size='small'
						color='primary'
						onChange={(_e, checked) => {
							onChange?.(checked);
						}}
						{...props}
					/>
				}
				label={label}
				labelPlacement='end'
			/>
		</FormGroup>
	);
};

export const Checkbox = ({
	name,
	label,
	disabled,
	onChange
}: {
	label: string;
	name: string;
	disabled?: boolean;
	onChange?: (checked: boolean) => void;
}) => {
	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<Controller
						name={name}
						render={({ field }) => (
							<MuiCheckbox
								inputProps={{ 'aria-labelledby': `${slugify(name)}-checkbox` }}
								disabled={disabled}
								checked={field.value}
								size='small'
								color='primary'
								onChange={(e, checked) => {
									field.onChange(e);
									onChange?.(checked);
								}}
							/>
						)}
					/>
				}
				label={label}
				labelPlacement='end'
			/>
		</FormGroup>
	);
};
