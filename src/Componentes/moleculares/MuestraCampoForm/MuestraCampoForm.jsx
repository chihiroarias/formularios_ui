import React from "react";
import PropTypes from "prop-types";
import CustomInputField from "../CustomInputField/CustomInputField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import SeccionField from "../../atomicos/SectionField/SectionField";
import Select from "../../atomicos/Select/Select";

const MuestraCampoForm = (props) => {
  return (
    <div
      className="form-group"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: "5px 0 5px 10px",
      }}
    >
      {props.type === "1" ? (
        <div>
          <CustomTextArea
            labelForm={props.indexadoForm + " " + props.label}
            style={{ marginInline: "10px" }}
            htmlFor={props.htmlFor}
            className="prettyInput"
            id={props.id}
            name={props.name}
            register={props.register}
            validation={props.validation}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={props.required}
            {...props}
          />
        </div>
      ) : (
        ""
      )}

      {props.type !== "1" && props.type !== "2" ? (
        <div>
          <CustomInputField
            labelForm={props.indexadoForm + " " + props.label}
            style={{ marginInline: "10px" }}
            htmlFor={props.htmlFor}
            className="prettyInput"
            id={props.id}
            name={props.name}
            register={props.register}
            validation={props.validation}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}
            required={props.required}
            {...props}
          />
        </div>
      ) : (
        ""
      )}
      {props.type === "2" ? (
        <div>
          <SeccionField
            content={props.indexadoForm + " " + props.labelForm}
            {...props}
          />
        </div>
      ) : (
        ""
      )}
      {props.type === "select" ? (
        <div>
          <Select />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

MuestraCampoForm.propTypes = {
  id: PropTypes.string,
  labelForm: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  validation: PropTypes.object,
  type: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  indexadoForm: PropTypes.string,
  selectedType: PropTypes.string,
  content: PropTypes.string,
};

MuestraCampoForm.defaultProps = {
  validation: {},
  type: "text",
  onChange: () => {},
  placeholder: "",
  required: false,
};

export default MuestraCampoForm;
