import React, { useState } from "react";
import Select from "../../atomicos/Select/Select";

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
    </div>
  );
};

export default CreateSelect;
