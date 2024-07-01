import Label from "../../atomicos/Label/Label";
import Select from "../../atomicos/Select/Select.jsx";

import { selectItems } from "../../../Utils/selectUtils.js";
import { useEffect, useState } from "react";
import TipoCampoFijo from "../TipoCampoFijo/TipoCampoFijo.jsx";
import DatoInput from "../DatoInput/DatoInput.jsx";
import { accessAPI } from "../../../Utils/utils.js";
import Loader from "../../../elementos/loader/Loader.js";
import CreateSelect from "../selects/configureSelect.jsx";
import CreateString from "../DatoInput/createString.jsx";
import CreateDate from "../CampoDate/createDate.jsx";

import { selectItemsCampo } from "../../../Utils/selectCampoUtils.js";
import React, { useState } from "react";
import CreateSelect from "../selects/createSelect.jsx";
import CreateDato from "../CreateDato/CreateDato.jsx";


function TipoCampo({addField, indice, setIndice}) {
  
  const [selectedType, setSelectedType] = useState("");
  
  //const [loader, setLoader] = useState(true);


  const renderComponent = () => {
    switch (selectedType) {
      case "input":
        return <CreateDato indice={indice} setIndice={setIndice} addField={addField} />;
      case "select":
        return <CreateSelect indice={indice} setIndice={setIndice}  addField={addField} />;
      //case 'checkbox':
          //return <Checkbox />;
       /*     case 'archivo':
            return <Archivo />;*/
      default:
        return null;
    }
  };
  const handleSelectChange = (event) => {
    setSelectedType(event.target.value);
  };

  /*
    {loader && <Loader>Cargando el proceso</Loader>}
      {!loader && (
      )}
  */

  return (
    <div >
      <div style={{
      //border: '1px solid red',
      display: 'flex',
      alignItems:'center',
      justifyContent: 'space-between',
      margin:'5px 0 5px 10px',
    }}>
        <Label  htmlFor={'tipoCampo'} labelForm={"Tipo de Campo *"} />
        <Select
          id='tipoCampo'
          options={selectItemsCampo}
          onChange={handleSelectChange}
          selectName={"Tipo de Campo"}
        />
      </div>
      {renderComponent()}
    </div>
    
  );
}

export default TipoCampo;
