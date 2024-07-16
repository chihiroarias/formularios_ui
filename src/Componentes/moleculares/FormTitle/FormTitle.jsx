import PropTypes from 'prop-types';
import CustomInputField from '../CustomInputField/CustomInputField';



const FormTitle = ({ title, setTitle, required }) => {
	return (
	  <>
		<CustomInputField
			id={'title'}
			htmlFor={'title'}
			name={'title'} 
			labelForm={'Título'} 
			type={"text"} 
			value={title}
			required={required} 
			onChange={(e) => setTitle(e.target.value)}/>
	  </>
	);
  };

  
FormTitle.propTypes = {
	CustomInputField: PropTypes.string.isRequired,
};

export default FormTitle;