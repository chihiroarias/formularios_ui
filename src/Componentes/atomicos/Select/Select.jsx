import { React } from 'react';
import PropTypes from 'prop-types';


/* Los valores deben ser un array conteniendo string y determinando el texto y el valor en las opciones para mostrarse
		los valores de las opciones serán el index de ese valor particular en el array*/
const Select = ({
	selectName,
	options,
	onChange,
	selectedValue,
	register,
	validation,
	selectStyles,
	classes,
	...props
}) => {
	return (
		<select
			className={`bg-white ${classes}`}
			name={selectName}
			id={selectName}
			onChange={onChange}
			value={selectedValue}
			{...(register && { ...register(selectName, validation) })}
			style={selectStyles}
			{...props}
		>
			{options.map((option, index) => (
				<option key={index} value={option.value ? option.value : option}>
					{option.name ? option.name : option}
				</option>
			))}
		</select>
	);
};

Select.propTypes = {
	selectName: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func,
	selectedValue: PropTypes.any,
	validation: PropTypes.object,
	selectStyles: PropTypes.object,
	classes: PropTypes.string,
	register: PropTypes.func,
};

export default Select;