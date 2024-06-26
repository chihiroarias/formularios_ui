import React, { useState, useRef, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";
import SelectsExistentes from "./selectsDelSistema";
import CreateSelect from "./createSelect";

const ConfigureSelect = () => {
  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [endpoint, setEndpoint] = useState("");
  const [selectName, setSelectName] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);

  const tipoSelect = useRef();

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index][event.target.name] = event.target.value;
    setOptions(newOptions);
  };

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value || event.target.valor;
    setSelectedValue(selectedOption);
  };

  const handleTipoSelectChange = (event) => {
    setTipoSeleccionado(event.target.value);
  };

  useEffect(() => {
    if (tipoSeleccionado === "2" && endpoint) {
      accessAPI(
        "GET",
        endpoint,
        null,
        (response) => {
          setSelectOptions(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [tipoSeleccionado, endpoint]);

  const optionsForSelect = [
    { value: "1", name: "Crear mi propio Select" },
    { value: "2", name: "Select precargado" },
    { value: "3", name: "Select anidado" },
    { value: "4", name: "Selects existentes" },
  ];

  return (
    <>
      <div>
        <br />
        <div>
          <label htmlFor="selecttipos">Tipos</label>
          <Select
            id="selecttipos"
            selectName="selecttipos"
            ref={tipoSelect}
            options={optionsForSelect}
            onChange={handleTipoSelectChange}
          />
        </div>

        {tipoSeleccionado === "1" && (
          <div>
            <CreateSelect />
          </div>
        )}

        {tipoSeleccionado === "2" && (
          <InputField
            type="text"
            name="endpoint"
            placeholder="Endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        )}

        {tipoSeleccionado === "3" && <Select />}
        {tipoSeleccionado === "4" && (
          <div>
            <SelectsExistentes />
          </div>
        )}

        <br />
        <InputField
          type="text"
          name="nombredelselect"
          placeholder="Nombre del Select"
          value={selectName}
          onChange={(e) => setSelectName(e.target.value)}
        />

        <Select
          selectName={selectName}
          endpoint={endpoint}
          options={tipoSeleccionado === "2" ? selectOptions : options}
          onChange={handleSelectChange}
          selectedValue={selectedValue}
        />
      </div>
    </>
  );
};

export default ConfigureSelect;

/*<Select
              selectName={"Seleccione una precarga"}
              endpoint={"admin/form/precargas"}
              onChange={handleSelectChange}
              selectedValue={selectedValue}
            />
            <button onClick={() => addSelectExistente(idcompetente)}>
              Utilizar este select
            </button>
            {selectConfig && <div>{selectConfig}</div>} */
