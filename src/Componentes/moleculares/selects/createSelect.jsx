import React, { useState } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";

const CreateSelect = () => {
  const [selectName, setSelectName] = useState("");
  const [options, setOptions] = useState([{ name: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index][event.target.name] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { name: "", value: "" }]);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  function createSelectPrecargado(options) {
    const payload = {
      selectName: selectName,
      precargaSelects: options.map((option) => ({
        name: option.name,
        value: option.value || option.name, // Use name as value if value is empty
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
            <input
              type="text"
              name="name"
              placeholder={`Nombre de la opción ${index + 1}`}
              value={option.name}
              onChange={(e) => handleOptionChange(index, e)}
            />
            <input
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
        selectName={selectName}
        options={options.map((option) => ({
          ...option,
          value: option.value || option.name,
        }))}
        onChange={handleSelectChange}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default CreateSelect;
