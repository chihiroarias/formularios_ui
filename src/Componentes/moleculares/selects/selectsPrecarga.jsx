import React, { useState,  useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import CustomInputField from "../CustomInputField/CustomInputField"
import Label from "../../atomicos/Label/Label.jsx";


const SelectsPrecargado = ({onCreate,errorEndpoint }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [endpoint, setEndpoint] = useState("");
    const [selectOptions, setSelectOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value || event.target.valor;
    setSelectedValue(selectedOption);
  };


  useEffect(() => {
    if (endpoint) {
      accessAPI(
        "GET",
        endpoint,
        null,
        (response) => {
          setSelectOptions(response.data);
          onCreate(endpoint, response)
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [endpoint]);

  return (
    <div className="customInput">
        <div>
            <CustomInputField
            id={"endpoint"}
            labelForm={"RESTful Endpoint"}
            name={"endpoint"}
            htmlFor={"endpoint"}
            type={"text"}
            value={endpoint}
            required={true}
            onChange={(e) => setEndpoint(e.target.value)}
            error={errorEndpoint ? errorEndpoint : ""}
            />      
            <Label labelForm={'Previsualización'}/>
            <Select
              endpoint={endpoint}
              options={ selectOptions }
              onChange={handleSelectChange}
              value={selectedValue}
            />
        </div>
   </div>
  );
};

export default SelectsPrecargado;
