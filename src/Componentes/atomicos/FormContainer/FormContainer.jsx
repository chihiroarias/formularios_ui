import PropTypes from 'prop-types';

const FormContainer = ({ children, logo }) => {
	return (
		<div id="formContainer" className="h-full">
			<div style={{ 					
					marginTop: '50px',
					display: "flex",
					justifyContent: "center", 
					maxWidth: '600px',
					}}>
				{/* <div className="flex pb-4">
					<img src={logo} alt="Imagen Logo" />{' '}
				</div> */}
				<div
					className="container-fluid"
					style={{ backgroundColor: 'white' }}
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