import PropTypes from "prop-types";


const TextAreaField = ({
  id,
  name,
  register,
  validation,
  onChange,
  placeholder,
  value,
  hight,
  obl,
  ...props
}) => {


  let stringInputClass = " border: 1px solid red";

  return (
    <div >
      <textarea
        style={{fontFamily: "Montserrat"}}
        id={id ?? name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${stringInputClass} ${hight}`}
        value={value}
        required={obl}
        {...(register && { ...register(name, validation) })}
        {...props}
      />
    </div>
  );
};

TextAreaField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  validation: PropTypes.object,
  register: PropTypes.func,
  onChange: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
  hight: PropTypes.string,
};

// specifies the default values for type prop
TextAreaField.defaultProps = {
  id: "textarea",
  name: "textarea",
};

export default TextAreaField;
