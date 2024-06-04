import PropTypes from 'prop-types';

function CheckBox({ name, text }) {
	return (
		<>
			<input id={name} type="checkbox" name={name} />
			<label htmlFor={name} className="text-gray-400">
				{' '}
				{text}
			</label>
		</>
	);
}

CheckBox.propTypes = {
	name: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default CheckBox;