import React, { useState} from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import Label from "../../atomicos/Label/Label"


const SelectsExistentes = ({onCreate}) => {

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => { 
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
    addSelectExistente(selectedOption);
  };

  function addSelectExistente(selectPrecargadoid) {
    if (selectPrecargadoid) {
      accessAPI(
        "GET",
        `admin/form/${selectPrecargadoid}`,
        null,
        (response) => {
          if(response && response.nombre && response.id ){
            onCreate(response.nombre, response.id);
            console.log("Select agregado");
            console.log(response.nombre +' '+ response.id);
          } 
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(selectPrecargadoid);
    }
  }

  return (

        <div
        className="customInput"
        style={{
        //border: '1px solid red',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        margin:'5px 0 5px 10px', 
        }}  >
          <Label labelForm={"Seleccione precarga"} htmlFor={"precarga"} />
          <Select
            id={"precarga"}
            selectName={"Seleccione una precarga"}
            endpoint={"admin/form/precargas"}
            onChange={handleSelectChange}
            selectedValue={selectedValue}
          />
          </div>
  );
};

export default SelectsExistentes;
