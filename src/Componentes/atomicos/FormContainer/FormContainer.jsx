import PropTypes from 'prop-types';

const FormContainer = ({ children, logo }) => {
	return (
		<div id="formContainer" className="h-full">
			<div style={{ 					
					marginTop: '50px',
					display: "flex",
					justifyContent: "center", 
					width: '800px',
					maxWidth: '1000px',
					}}>
				{/* <div className="flex pb-4">
					<img src={logo} alt="Imagen Logo" />{' '}
				</div> */}
				<div
					className="container-fluid bg-blancoQualis px-10"
					//style={{ backgroundColor: 'white' }}
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