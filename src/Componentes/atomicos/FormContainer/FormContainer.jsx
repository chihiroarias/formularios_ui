import PropTypes from 'prop-types';

const FormContainer = ({ children, logo }) => {
	return (
		<div id="formContainer" className="h-full">
			<div style={{ paddingTop: '8vh', marginLeft: '5vh'}}>
				<div className="flex pb-4">
					<img src={logo} alt="Imagen Logo" />{' '}
				</div>
				<div
					className="mx-auto bg-white pt-5 px-8 pb-8"
					style={{ maxWidth: '540px' }}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

FormContainer.propTypes = {
	children: PropTypes.node,
	logo: PropTypes.string,
};

FormContainer.defaultProps = {
	node: 'Nodo Login/Signin Example',
};

export default FormContainer;