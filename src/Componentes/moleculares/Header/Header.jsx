import PropTypes from 'prop-types';
import Label from '../../atomicos/Label/Label';
import InputField from '../../atomicos/InputField/InputField';


const Heading= () => {

	return (
		<>
            <Label name={"Título"}/> <InputField type={"text"}/>
		</>
	);
}

Heading.propTypes = {
	Label: PropTypes.string.isRequired,
	InputField: PropTypes.string.isRequired,
};

export default Heading;