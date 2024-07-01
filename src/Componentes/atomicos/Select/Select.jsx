import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { accessAPI } from "../../../Utils/utils";

const Select = ({
  selectName,
  options,
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
  const [optionsEndpoint, setOptionsEndpoint] = useState(null);

  useEffect(() => {
    if (endpoint) {
      accessAPI(
        "GET",
        `${endpoint}`,
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
  }, [endpoint]);

  return (
    <div>
      <div style={{
        //border: '1px solid red',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        margin:'5px 0 5px 10px',
        }}>
        <select
          className=" prettyInput centrado"
          name={selectName}
          id={selectName}
          onChange={onChange}
          value={selectedValue}
          {...(register && { ...register(selectName, validation) })}
          style={selectStyles}
          {...props}>
          {optionsEndpoint
            ? optionsEndpoint.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.etiqueta}
                </option>
              ))
            : options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
        </select>
        
        </div>
        <div>
        {
        error &&
      <div style={{
        //border: '1px solid red',
        color: 'red',
        display:'flex',
        justifyContent: 'end',
        fontSize: '0.75em'
        }}>
          {error}
      </div>
        }
      </div>
    </div>
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
  endpoint: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.any,
  register: PropTypes.func,
  validation: PropTypes.object,
  selectStyles: PropTypes.object,
  classes: PropTypes.string,
};

export default Select;
