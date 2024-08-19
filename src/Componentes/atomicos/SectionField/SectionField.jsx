import PropTypes from "prop-types";


const SectionField = ({
  content,
  obl,
  ...props
}) => {

  return (
    <div 
    className="mt-5 justify-start"
    // style={{fontFamily: "Montserrat", textAlign:"left"}}
    required={obl}
    {...props}
    >
      <p className="justify-start">
        <b>
          {content}
        </b>
      </p>
    </div>
  );
};

SectionField.propTypes = {
  content: PropTypes.string,
  obl: PropTypes.bool,
};

// specifies the default values for type prop
SectionField.defaultProps = {
  content: "Sección",
  obl: false,
};

export default SectionField;
