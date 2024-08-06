import React from "react";
import PropTypes from "prop-types";
import CustomInputField from "../CustomInputField/CustomInputField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import SeccionField from "../../atomicos/SectionField/SectionField";
import MuestraSelectDelSistema from "../selects/MuestraSelectDelSistema";
import MuestraSelectPrecargado from "../selects/MuestraSelectPrecargado";
import { styleCampo } from "../../../Utils/styleCampo";

const MuestraCampoForm = (props) => {
  return (
    <div className="form-group">
      {props.type === "textarea" && (
        <CustomTextArea estiloCampo={styleCampo} {...props} />
      )}

      {props.type !== "textarea" &&
        props.type !== "section" &&
        props.type !== "select" &&
        props.type !== "sExistentes" &&
        props.type !== "sPrecargado" && (
          <CustomInputField estiloCampo={styleCampo} {...props} />
        )}

      {props.type === "section" && (
        <SeccionField
          content={props.indexadoForm + " " + props.labelForm}
          {...props}
        />
      )}

      {(props.type === "select" || props.type === "sExistentes") &&
        props.selectName && (
          <MuestraSelectDelSistema
            estiloCampo={styleCampo}
            selectPrecargadoId={props.selectPrecargadoId}
            {...props}
          />
        )}

      {props.type === "sPrecargado" && props.selectEndpoint && (
        <MuestraSelectPrecargado
          estiloCampo={styleCampo}
          selectEndpoint={props.selectEndpoint}
          {...props}
        />
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
  selectName: PropTypes.string,
  selectPrecargadoId: PropTypes.string,
  selectEndpoint: PropTypes.string,
};

MuestraCampoForm.defaultProps = {
  validation: {},
  type: "text",
  onChange: () => {},
  placeholder: "",
  required: false,
};

export default MuestraCampoForm;
