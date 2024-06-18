import React, { useState } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";

const CreateSelect = () => {
  const [selectName, setSelectName] = useState("");
  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index][event.target.name] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { etiqueta: "", value: "" }]);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function createSelectPrecargado(options) {
    const payload = {
      selectName: selectName,
      precargaSelects: options.map((option) => ({
        name: option.etiqueta,
        value: option.value || option.etiqueta, // Use etiqueta as value if value is empty
      })),
    };

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
        console.log(options);
      }
    );
  }

  return (
    <div>
      <label htmlFor="selectName">Nombre del Select</label>
      <input
        type="text"
        id="selectName"
        value={selectName}
        onChange={(e) => setSelectName(e.target.value)}
      />
      <div>
        <label>Opciones</label>
        {options.map((option, index) => (
          <div key={index}>
            <InputField
              type="text"
              name="etiqueta"
              placeholder={`Nombre de la opción ${index + 1}`}
              value={option.etiqueta}
              onChange={(e) => handleOptionChange(index, e)}
            />
            <InputField
              type="text"
              name="value"
              placeholder={`Valor de la opción ${index + 1} (opcional)`}
              value={option.value}
              onChange={(e) => handleOptionChange(index, e)}
            />
          </div>
        ))}
      </div>
      <button onClick={addOption}>Añadir opción</button>
      <br />
      <button onClick={() => createSelectPrecargado(options)}>
        Crear Select
      </button>
      <br />
      <Select
        endpoint={"admin/norma"}
        selectName={selectName}
        options={options.map((option) => ({
          ...option,
          value: option.value || option.etiqueta,
        }))}
        onChange={handleSelectChange}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default CreateSelect;
