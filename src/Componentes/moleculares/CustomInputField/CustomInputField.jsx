import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../atomicos/InputField/InputField';
import Label from '../../atomicos/Label/Label';
import './CustomInputField.css'


const CustomInputField = ({
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
	...props
}) => (
	<div>
		<div className='customInput' 
			style={{
				//border: '1px solid red',
				display: 'flex',
				alignItems:'center',
				justifyContent: 'space-between',
				margin:'5px 0 5px 10px',
			}}
			>
			<Label labelForm={labelForm} htmlFor={htmlFor??id}/>
			<InputField
				className=" prettyInput centrado"
				id={id}
				name={name??id}
				register={register}
				validation={validation}
				type={type}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				value={value}
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

CustomInputField.propTypes = {
	htmlFor: PropTypes.string,
	id: PropTypes.string,
	labelForm: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	register: PropTypes.func,
	//errors: PropTypes.object.isRequired,
	validation: PropTypes.object,
	type: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.string,
};


CustomInputField.defaultProps = {
	type: 'text',
	onChange: () => {},
	placeholder: '',
	error: '',
  };
export default CustomInputField;