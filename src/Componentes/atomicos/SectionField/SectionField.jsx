import PropTypes from "prop-types";


const SectionField = ({
  content,
  obl,
  ...props
}) => {

  return (
    <div 
    style={{fontFamily: "Montserrat", textAlign:"left"}}
    required={obl}
    {...props}
    >
      <p>
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
