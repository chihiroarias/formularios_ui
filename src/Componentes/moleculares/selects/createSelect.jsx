import React, { useState, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";

const CreateSelect = () => {
  const [selectName, setSelectName] = useState("");
  const [options, setOptions] = useState([{ name: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");

  const [configSelect, setConfigSelect] = useState(null);

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
    accessAPI(
      "POST",
      "admin/form/selectprecargado",
      options,
      (response) => {
        console.log(response);
      },
      (response) => {
        console.log(response);
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
          </div>
        ))}
      </div>
      <button onClick={addOption}>Añadir opción</button>
      <Select
        selectName={selectName}
        options={options}
        onChange={handleSelectChange}
        selectedValue={selectedValue}
      />
      <button onClick={() => createSelectPrecargado(options)}>
        Crear Select
      </button>
    </div>
  );
};

export default CreateSelect;
