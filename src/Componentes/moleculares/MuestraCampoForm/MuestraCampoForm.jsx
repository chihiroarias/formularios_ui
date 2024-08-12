import React from "react";
import PropTypes from "prop-types";
import CustomInputField from "../CustomInputField/CustomInputField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import SeccionField from "../../atomicos/SectionField/SectionField";
import MuestraSelectDelSistema from "../selects/MuestraSelectDelSistema";
import MuestraSelectPrecargado from "../selects/MuestraSelectPrecargado";

import { styleCampo } from "../../../Utils/styleCampo";
import ShowInformation from "../../atomicos/Info/ShowInformation";


const MuestraCampoForm = (props) => {
  const { errors, name, errorMsg } = props;

  const renderError = () => {
    if (errors && errors[name] && errors[name].type === "pattern") {
      return <div className="text-red-500 text-sm">{errorMsg || "Formato incorrecto"}</div>;
    }
    return null;
  };
  return (
   
    <div
      className="form-group"
     >
      {props.type === "textarea" ? (
        <div>
          <CustomTextArea
            estiloCampo={styleCampo}
            {...props}
          />
        </div>
      ) : (
        null
      )}

      {props.type !== "textarea" 
        && props.type !== "section"
        && props.type !== "select" 
        && props.type !== "sExistentes"
        && props.type !== "sPrecargado"? (
        <div >
          <CustomInputField    
           estiloCampo={styleCampo}       
           regex={props.regex}  
           errorMsg={props.errorMsg}  
            {...props}
          />
           {renderError()}
        </div>
      ) : (
        null
      )}
      {props.type === "section" ? (
        <div>
          <SeccionField
            content={props.indexadoForm + " " + props.labelForm}
            {...props}
          />
        </div>
      ) : (
        null
      )}

      {(props.type === "select" || props.type==="sExistentes") && props.selectName ? (
        <div>
          <MuestraSelectDelSistema 
            estiloCampo={styleCampo}  
            selectId={props.selectId} 
            {...props}
          />
        </div>
      ) : (
        null
      )}

      {(props.type === "select" || props.type === "sExistentes") && (
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

      {props.info && <ShowInformation info={props.info} />}

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
  regex: PropTypes.string,
  content: PropTypes.string,

  selectName: PropTypes.string,
  selectPrecargadoId: PropTypes.string,
  selectEndpoint: PropTypes.string,
  info: PropTypes.string,
};

MuestraCampoForm.defaultProps = {
  validation: {},
  type: "text",
  onChange: () => {},
  placeholder: "",
  required: false,
};

export default MuestraCampoForm;
