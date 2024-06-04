import PropTypes from 'prop-types';
//import { formDescription } from '../../../Utils/formDescriptionUtils.js';
import Label from '../../atomicos/Label/Label.jsx';
import InputField from '../../../Componentes/atomicos/InputField/InputField.jsx';

function FormDescription({ text, ...props }) {

	return (
		<>
		    <Label name={'Descripción'} />
			<InputField type={'textarea'} />
           
		</>
	);
}

FormDescription.propTypes = {
	text: PropTypes.string.isRequired,
};

export default FormDescription;