import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { accessAPI } from "../../../Utils/utils";

const Select = ({
  selectName,
  options = [],
  onChange,
  selectedValue,
  register,
  validation,
  selectStyles,
  classes,
  endpoint,
  ...props
}) => {
  const [endpointParams, setEndpointParams] = useState("");
  const [optionsEndpoint, setOptionsEndpoint] = useState(null);

  useEffect(() => {
    if (endpoint) {
      setEndpointParams(endpoint);
    }
  }, [endpoint]);

  useEffect(() => {
    if (endpointParams) {
      accessAPI(
        "GET",
        endpointParams,
        null,
        (response) => {
          setOptionsEndpoint(response);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [endpointParams]);

  const renderOptions = (opts) => {
    return opts.map((option, index) => (
      <option key={index} value={option.value}>
        {option.name || option.etiqueta}
      </option>
    ));
  };

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
      {optionsEndpoint
        ? renderOptions(optionsEndpoint)
        : renderOptions(options)}
    </select>
  );
};

Select.propTypes = {
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

export default Select;
