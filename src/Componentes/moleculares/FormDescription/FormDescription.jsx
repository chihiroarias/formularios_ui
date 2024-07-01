import PropTypes from 'prop-types';
//import CustomTextArea from '../CustomTextarea/CustomTextarea.jsx';
import CustomTextArea from '../CustomTextArea/CustomTextArea';

const FormDescription=({ description, setDescription })=> {
	return (
		<div>
			<CustomTextArea 
			    name={'Description'} 
				id={'description'}
				htmlFor={'description'}
				labelForm={'Descripción'} 
				type={"textarea"} 
				value={description}
				onChange={(e) => setDescription(e.target.value)}/>
		</div>
		);
	};
	
	
	FormDescription.propTypes = {
		CustomTextArea: PropTypes.string.isRequired,
	};
	


export default FormDescription;