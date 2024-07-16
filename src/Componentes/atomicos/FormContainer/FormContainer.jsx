import PropTypes from "prop-types";

const FormContainer = ({ children }) => {
  return (
    <div
      id="formContainer"
      //className="container-fluid bg-blancoQualis px-10 h-full"
      style={{ width: "500px"}}
    >
      {children}
    </div>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node,
};

FormContainer.defaultProps = {
  node: "Nodo Login/Signin Example",
};

export default FormContainer;
