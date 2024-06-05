import React from "react";
import PropTypes from "prop-types";

const Select = ({
  selectName,
  options,
  onChange,
  selectedValue,
  register,
  validation,
  selectStyles,
  classes,
  ...props
}) => {
  return (
    <select
      className={`bg-white ${classes}`}
      name={selectName}
      id={selectName}
      onChange={onChange}
      value={selectedValue}
      {...(register && { ...register(selectName, validation) })}
      style={selectStyles}
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  selectName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.any,
  register: PropTypes.func,
  validation: PropTypes.object,
  selectStyles: PropTypes.object,
  classes: PropTypes.string,
};

export default Select;
