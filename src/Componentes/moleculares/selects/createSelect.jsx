import React, { useState, useRef, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";

const CreateSelect = () => {
  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [selectName, setSelectName] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [payload, setPayload] = useState(null);
  const [ingresarEndpoint, setIngresEndpoint] = useState(false);

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index][event.target.name] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { etiqueta: "", value: "" }]);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value || event.target.valor;
    setSelectedValue(selectedOption);
  };

  const createSelectPrecargado = () => {
    const stirngtopost = options
      .map((optn) => `${optn.value} - ${optn.name || optn.etiqueta}`)
      .join(" ; ");
    setPayload({
      precargaSelects: stirngtopost,
      nombre: selectName,
    });
  };

  useEffect(() => {
    if (payload) {
      accessAPI(
        "POST",
        "admin/form/selectprecargado",
        payload,
        (response) => {
          console.log(response);
          console.log(options);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [payload]);


  return (
    <>
      <div>
        <br />

        <div>
          <label>Opciones</label>
          {options.map((option, index) => (
            <div key={index}>
              <InputField
                type="text"
                name="etiqueta"
                placeholder={`Nombre ${index + 1}`}
                value={option.etiqueta}
                onChange={(e) => handleOptionChange(index, e)}
              />
              <InputField
                type="text"
                name="value"
                placeholder={`Valor ${index + 1} (opcional)`}
                value={option.value}
                onChange={(e) => handleOptionChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addOption}>Añadir opción</button>
        </div>

        <br />
        <InputField
          type="text"
          name="nombredelselect"
          placeholder="Nombre del Select"
          value={selectName}
          onChange={(e) => setSelectName(e.target.value)}
        />
        <br />
        <button onClick={createSelectPrecargado}>Crear Select</button>
        <br />

        <Select
          selectName={selectName}
          endpoint={endpoint}
          onChange={handleSelectChange}
          selectedValue={selectedValue}
        />
      </div>
    </>
  );
};

export default CreateSelect;
