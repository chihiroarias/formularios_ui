import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import InputField from './InputField';

const CustomInputField = ({
	id,
	label,
	name,
	register,
	errors,
	validation,
	type,
	onChange,
	placeholder,
	required,
	...props
}) => (
	<>
		<label htmlFor={name}>{label}</label>
		<InputField
			id={id ?? name}
			name={name}
			register={register}
			validation={validation}
			type={type}
			onChange={onChange}
			placeholder={placeholder}
			required={required}
			{...props}
		/>
		<div style={{ color: 'red' }}>
			<ErrorMessage errors={errors} name={name} />
		</div>
	</>
);

CustomInputField.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	register: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	validation: PropTypes.object,
	type: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
};

CustomInputField.defaultProps = {
	validation: {},
	type: 'text',
	onChange: () => {},
	placeholder: '',
	required: false,
};

export default CustomInputField;