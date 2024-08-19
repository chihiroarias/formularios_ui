import React, { useState } from "react";
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
  regex,
  obl,
  error,
  ...props
}) => {

 const [errorMsg, setErrorMsg] = useState("");

const handleChange = (e) => {
  const val = e.target.value;
  if (regex && !new RegExp(regex).test(val)) {
    setErrorMsg(error || "Formato incorrecto");
  } else {
    setErrorMsg("");
  }
  onChange(e);
};

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
        id={id}
        name={name??id}
        type={inputType}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input-field ${type} ${hight} ${error ? "input-error" : ""} prettyInput`}
        value={value}
        required={obl}
        {...(register && { ...register(name, validation) })}
        {...props}
      />
      {errorMsg && <div style={{ color: "red", fontSize: "0.75em" }}>{errorMsg}</div>}
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
  regex: PropTypes.string,
  error: PropTypes.string,
};

// specifies the default values for type prop
InputField.defaultProps = {
  name: "input",
};

export default InputField;
