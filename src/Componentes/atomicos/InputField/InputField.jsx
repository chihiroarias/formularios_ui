import PropTypes from 'prop-types';

const InputField = ({
	id,
	name,
	register,
	validation,
	type,
	onChange,
	placeholder,
	value,
	hight,
	...props
}) => {
	if (type) type = type.trim().toLowerCase();

	let validTypes = [
		'email',
		'number',
		'tel',
		'text',
        'textarea',
		'url',
        'date',
	];

	// Si el prop type no es un tipo válido será del tipo text por default
	if (!validTypes.includes(type)) type = 'text';

	let stringInputClass =
		'input input-sm w-full text-gray-700 bg-white text-base border-gray-300 py-4 rounded box-shadow-none focus:outline-none focus:border-gray-500 disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-600 disabled:font-medium';

	return (
		<div className="form-control">
			<input
				id={id ?? name}
				name={name}
				type={type}
				onChange={onChange}
				placeholder={placeholder}
				className={`input-field ${type} ${stringInputClass} ${hight}`}
				value={value}
				{...(register && { ...register(name, validation) })}
				{...props}
			/>
		</div>
	);
};

InputField.propTypes = {
	type: PropTypes.oneOf([
		'email',
		'number',
		'tel',
		'text',
        'textarea',
		'url',
        'date',
	]),
	placeholder: PropTypes.string,
	name: PropTypes.string,
	validation: PropTypes.object,
	register: PropTypes.func,
	onChange: PropTypes.func,
	id: PropTypes.string,
	value: PropTypes.string,
	hight: PropTypes.string,
};

// specifies the default values for type prop
InputField.defaultProps = {
	type: 'text',
	name: 'input',
};

export default InputField;