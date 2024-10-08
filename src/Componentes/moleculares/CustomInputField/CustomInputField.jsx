import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../atomicos/InputField/InputField';
import Label from '../../atomicos/Label/Label';
import './CustomInputField.css'


const 	CustomInputField = ({
	htmlFor,
	id,
	labelForm,
	name,
	register,
	validation,
	type,
	value,
	onChange,
	placeholder,
	error,
	required,
	regex,
	indexadoForm,
	...props
}) => {
	const labelText = required ? `${labelForm} *` : labelForm;

	return(
	<div>
		<div //className='grid grid-cols-2 gap-2' 
			style={props.estiloCampo?props.estiloCampo:{margin: "5px 0 5px 0px"}}
			>
				<Label 
					labelForm={indexadoForm ? `${indexadoForm} ${labelText}` : labelText} 
					htmlFor={htmlFor ?? id}
				/>
				<InputField
					className={`${type !== "checkbox" ? "prettyInput" : ""} centrado`}
					id={id}
					name={name??id}
					register={register}
					validation={validation}
					type={type}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					value={value}
					regex={regex} 
					error={error}
					{...props}
				/>

		</div>
		<div>
			{error &&
				<div style={{ 
					//border: '1px solid red',
					color: 'red',
					display:'flex',
					justifyContent: 'end',
					fontSize: '0.75em' 
					}}>
						{error}
				</div>
			}
		</div> 
	</div>
	
);
};

CustomInputField.propTypes = {
	htmlFor: PropTypes.string,
	id: PropTypes.string,
	labelForm: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	register: PropTypes.func,
	validation: PropTypes.object,
	type: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.string,
	errorMsg: PropTypes.string,
	regex: PropTypes.string,  
};


CustomInputField.defaultProps = {
	type: 'text',
	onChange: () => {},
	placeholder: '',
	error: '',
  };
export default CustomInputField;