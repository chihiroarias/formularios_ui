import React, { useState, useRef } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";

const CreateSelect = () => {
  const [selectName, setSelectName] = useState("");
  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");

  // Estado para las opciones
  const [opcionesDeMapeo, setOpcionesDeMapeo] = useState([]);
  const [inputOpcionesDeMapeo, setInputOpcionesDeMapeo] = useState("");

  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  const endp = useRef();
  const tipoSelect = useRef();

  const handleSelectNameChange = (event) => {
    setSelectName(event.target.value);
  };

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

  const handleTipoSelectChange = (event) => {
    setTipoSeleccionado(event.target.value);
  };

  const createSelectPrecargado = () => {
    const payload = {
      selectName: selectName,
      precargaSelects: options.map((option) => ({
        name: option.etiqueta,
        value: option.value || option.etiqueta, // Usa etiqueta como valor si value está vacío
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
  };

  const optionsForSelect = [
    {
      value: 1,
      name: "Crear mi propio Select",
    },
    {
      value: 2,
      name: "Select precargado",
    },
    {
      value: 3,
      name: "Select anidado",
    },
  ];

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
        <label htmlFor="selecttipos">Tipos</label>
        <Select
          id="selecttipos"
          name="selecttipos"
          ref={tipoSelect}
          options={optionsForSelect}
          onChange={handleTipoSelectChange}
        />
      </div>

      <div>
        {tipoSeleccionado == 1 && (
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
        )}
      </div>
      <InputField
        text="text"
        name="endpoint"
        placeholder="Endpoint"
        ref={endp}
      />
      <button onClick={addOption}>Añadir opción</button>
      <br />
      <button onClick={createSelectPrecargado}>Crear Select</button>
      <br />

      <Select
        endpoint={endp.current?.value}
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
