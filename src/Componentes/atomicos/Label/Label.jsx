import React from 'react';
import PropTypes from 'prop-types';
import { properties } from '../../../Utils/utilitiesLabel';

const Label = ({ name, forUsername, variant, color, difClass, ...props }) => {
	return (
		<label
			htmlFor={forUsername}
			className={
				variant
					? `${properties[variant].transform} 
								${properties[variant].fontWeight} 
								${properties[variant].size} 
								${color ? `text-` + color : properties[variant].color}`
					: `${difClass}`
			}
			{...props}
		>
			{name}
		</label>
	);
};

Label.propTypes = {
	name: PropTypes.string,
	forUsername: PropTypes.string,
	variant: PropTypes.string,
	color: PropTypes.string,
	fontWeight: PropTypes.string,
	difClass: PropTypes.string,
};

Label.defaultProps = {
	name: 'Example Label Small',
	forUsername: 'UserName',
};

export default Label;