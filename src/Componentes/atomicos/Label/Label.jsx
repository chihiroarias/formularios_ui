import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ 
	labelForm, 
	htmlFor, 
	...props }) => {
	return (
		<label
			className='prettyInputEtiqueta pl-2'
			style={{marginRight:'10px'}}
			htmlFor={htmlFor}
			{...props}
		>
			{labelForm}
		</label>
	);
};

Label.propTypes = {
	labelForm: PropTypes.string,
	htmlFor: PropTypes.string,
};

Label.defaultProps = {
	labelForm: 'Example Label Small',
	htmlFor: 'UserName',
};

export default Label;