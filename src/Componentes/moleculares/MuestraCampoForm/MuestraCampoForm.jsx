import React from "react";
import PropTypes from "prop-types";
import CustomInputField from "../CustomInputField/CustomInputField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import SeccionField from "../../atomicos/SectionField/SectionField";
import MuestraSelectDelSistema from "../selects/MuestraSelectDelSistema";
import MuestraSelectPrecargado from "../selects/MuestraSelectPrecargado";
import {styleCampo} from "../../../Utils/styleCampo"

const MuestraCampoForm = (props) => {
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
        ""
      )}

      {props.type !== "textarea" 
        && props.type !== "section"
        && props.type !== "select" 
        && props.type !== "sExistentes"
        && props.type !== "sPrecargado"? (
        <div >
          <CustomInputField    
           estiloCampo={styleCampo}       
            {...props}
          />
        </div>
      ) : (
        ""
      )}
      {props.type === "section" ? (
        <div>
          <SeccionField
            content={props.indexadoForm + " " + props.labelForm}
            {...props}
          />
        </div>
      ) : (
        ""
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
        ""
      )}

      {props.type==="sPrecargado" && props.selectEndpoint ? (
        <div>
          <MuestraSelectPrecargado
            estiloCampo={styleCampo}
            selectEndpoint={props.selectEndpoint} 
            {...props}
          />
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
