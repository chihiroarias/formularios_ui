import React, { useEffect, useRef, useState } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import { selectEndpoint } from "../../../Utils/selectEndpoint";
import Button from "../../atomicos/Button/Button";

const CreateSelect = () => {
  const [selectName, setSelectName] = useState("");
  const [options, setOptions] = useState([{ name: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [urlset, setUrlset] = useState("");

  const urlRef = useRef(null);

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

  const handleSelectChangesetEndpoint = (event) => {
    setSelectedEndpoint(event.target.value);
    setUrlset(event.target.value);
  };

  function cargarSelect() {
    console.log(urlset);
    accessAPI(
      "GET",
      `${urlset}`,
      null,
      (respuesta) => {
        console.log(respuesta);
      },
      (respuesta) => {
        console.log(respuesta);
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
        ref={urlRef}
        selectName={selectName}
        options={options}
        onChange={handleSelectChange}
        selectedValue={selectedValue}
      />

      <div>
        <Select
          ref={urlRef}
          selectName={selectName}
          options={selectEndpoint}
          selectedValue={selectedEndpoint}
          onChange={handleSelectChangesetEndpoint}
        />
        <Button
          text={"Cargar select"}
          type={"submit"}
          clickHandler={cargarSelect()}
        />
      </div>
    </div>
  );
};

export default CreateSelect;
