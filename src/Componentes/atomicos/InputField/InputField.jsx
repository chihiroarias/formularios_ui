import PropTypes from "prop-types";


const InputField = ({
  id,
  name,
  register,
  validation,
  type,
  onChange,
  placeholder,
  value,
  hight,
  obl,
  ...props
}) => {
 // if (type) type = type.trim().toLowerCase();

  const validTypes = [
    "email",
    "number",
    "tel",
    "text",
    "url",
    "date",
    "file",
    "checkbox",
    "radio",
  ];

  // Si el prop type no es un tipo válido será del tipo text por default
  const inputType = validTypes.includes(type)? type : "text";

  return (
    <div >
      <input
        style={{fontFamily: "Montserrat"}}
        id={id}
        name={name??id}
        type={inputType}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${type} ${hight}`}
        value={value}
        required={obl}
        {...(register && { ...register(name, validation) })}
        {...props}
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.oneOf([
    "email",
    "number",
    "tel",
    "text",
    "url",
    "date",
    "file",
    "checkbox",
    "radio",]),
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
InputField.defaultProps = {
  name: "input",
};

export default InputField;
