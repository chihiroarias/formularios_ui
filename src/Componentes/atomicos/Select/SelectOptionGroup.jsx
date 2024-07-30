import React from 'react';

import PropTypes from "prop-types";

const SelectOptionGroup = ({
    selectName,
    options = [],
    onChange,
    selectedValue,
    register,
    validation,
    selectStyles,
    classes,
    endpoint,
    error,
    ...props
  }) => {
  return (
    <div>
        <div>
            <select
                className=" prettyInput centrado"
                name={selectName}
                id={selectName}
                onChange={onChange}
                value={selectedValue}
                {...(register && { ...register(selectName, validation) })}
                style={selectStyles}
                {...props}>
              {options.map((group, index) => (
                <optgroup key={index} label={group.label}>
                  {group.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
        </div>
        <div>
          {error && (
            <div
              style={{
                color: "red",
                display: "flex",
                justifyContent: "end",
                fontSize: "0.75em",
              }}
            >
              {error}
            </div>
          )}
        </div>
    </div>
  );
};
SelectOptionGroup.propTypes = {
    selectName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
      })
    ),
    endpoint: PropTypes.string,
    onChange: PropTypes.func,
    selectedValue: PropTypes.any,
    register: PropTypes.func,
    validation: PropTypes.object,
    selectStyles: PropTypes.object,
    classes: PropTypes.string,
  };
export default SelectOptionGroup;