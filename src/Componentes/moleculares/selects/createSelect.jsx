import React, { useState, useRef, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";

const CreateSelect = () => {
  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [endpoint, setEndpoint] = useState("");
  const [selectName, setSelectName] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [payload, setPayload] = useState(null);

  const tipoSelect = useRef();
  const nombredelselect = useRef();

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
    const stirngtopost = options
      .map((optn) => `${optn.value} - ${optn.name || optn.etiqueta}`)
      .join(" ; ");
    console.log(stirngtopost);
    setPayload({
      precargaSelects: stirngtopost,
      nombre: nombredelselect.current ? nombredelselect.current.value : "name",
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
          console.log(options);
        }
      );
    }
  }, [payload]);

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
            <button onClick={addOption}>Añadir opción</button>
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

        <br />
        <InputField
          type="text"
          name="nombredelselect"
          placeholder="Nombre del Select"
          value={selectName}
          ref={nombredelselect}
          onChange={(e) => setSelectName(e.target.value)}
        />
        <br />
        <button onClick={createSelectPrecargado}>Crear Select</button>
        <br />

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

export default CreateSelect;
