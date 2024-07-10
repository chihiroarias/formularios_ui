import PropTypes from 'prop-types';
//import CustomTextArea from '../CustomTextarea/CustomTextarea.jsx';
import CustomTextArea from '../CustomTextArea/CustomTextArea';

const FormDescription=({ description, setDescription, required })=> {
	return (
		<div>
			<CustomTextArea 
			    name={'Description'} 
				id={'description'}
				htmlFor={'description'}
				labelForm={'Descripción'} 
				type={"textarea"} 
				required={required}
				value={description}
				onChange={(e) => setDescription(e.target.value)}/>
		</div>
		);
	};
	
	
	FormDescription.propTypes = {
		CustomTextArea: PropTypes.string.isRequired,
	};
	


export default FormDescription;