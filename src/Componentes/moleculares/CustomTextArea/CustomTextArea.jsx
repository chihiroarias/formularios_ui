import React from 'react';
import PropTypes from 'prop-types';
//import TextAreaField from '../../atomicos/TextAreaField/TextAreaField';
import TextAreaField from '../../atomicos/TextAreaField/TextAreaField';
import Label from '../../atomicos/Label/Label';
//import './CustomInputField.css'


const CustomTextArea = ({
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
	indexadoForm,
	...props
}) => {
	const labelText = required ? `${labelForm} *` : labelForm;

	return(
	<div>
		<div className='customInput' 
			style={{
				//border: '1px solid red',
				//display: 'flex',
				alignItems:'center',
				//justifyContent: 'space-between',
				margin:'10px 0 5px 10px',
			}}
			>
			<Label labelForm={indexadoForm ? `${indexadoForm} ${labelText}` : labelText} htmlFor={htmlFor ?? id}/>
			<TextAreaField 
				width={'50px'}
                id={id}
                name={name??id} 
                placeholder={placeholder}
				className=" prettyInput centrado"				
				register={register}
				validation={validation}
				type={type}
				onChange={onChange}
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
};

CustomTextArea.propTypes = {
	htmlFor: PropTypes.string,
	id: PropTypes.string,
	labelForm: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	register: PropTypes.func.isRequired,
	validation: PropTypes.object,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.string,
	indexadoForm: PropTypes.string,
};


CustomTextArea.defaultProps = {
	onChange: () => {},
	placeholder: '',
	required: false,
	error: '',
  };
export default CustomTextArea;