import React, { useState } from "react";
import Select from "../../atomicos/Select/Select";
import Label from "../../atomicos/Label/Label";

const MuestraSelectPrecargado = ({ selectEndpoint, ...props }) => {
    const [selectedValue, setSelectedValue] = useState("");

    const labelText = props.required ? `${props.labelForm} *` : props.labelForm;

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value || event.target.valor;
    setSelectedValue(selectedOption);
  };


    return (
    <div       
        style={{
            //border: '1px solid red',
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "5px 0 5px 10px",
        }}>
        <Label labelForm={props.indexadoForm ? `${props.indexadoForm} ${labelText}` : labelText} htmlFor={props.htmlFor ?? props.id}/>
        <Select
            id={props.id}
            endpoint={selectEndpoint}
            onChange={handleSelectChange}
            value={selectedValue}
        />
   </div>
  );
};

export default MuestraSelectPrecargado;