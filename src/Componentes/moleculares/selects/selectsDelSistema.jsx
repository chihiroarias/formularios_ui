import React, { useState, useRef, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";

const SelectsExistentes = () => {
  const [options, setOptions] = useState([{ etiqueta: "", value: "" }]);
  const [selectedValue, setSelectedValue] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [selectName, setSelectName] = useState("");
  const [selectConfig, setSelectConfig] = useState(null);

  const [idcompetente, setIdcompetente] = useState(null);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value || event.target.valor;
    setSelectedValue(selectedOption);
    setIdcompetente(selectedOption);
  };

  useEffect(() => {
    if (endpoint) {
      accessAPI(
        "GET",
        endpoint,
        null,
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
    }
  }, [endpoint]);

  function addSelectExistente(selectPrecargadoid) {
    if (selectPrecargadoid) {
      accessAPI(
        "GET",
        `admin/form/${selectPrecargadoid}`,
        null,
        (response) => {
          setSelectConfig(
            <Select
              options={response.precargaSelects}
              selectName={response.nombre}
              onChange={handleSelectChange}
            />
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log(selectPrecargadoid);
    }
  }

  return (
    <>
      <div>
        <div>
          <Select
            selectName={"Seleccione una precarga"}
            endpoint={"admin/form/precargas"}
            onChange={handleSelectChange}
            selectedValue={selectedValue}
          />
          <br />
          <button onClick={() => addSelectExistente(idcompetente)}>
            Utilizar este select
          </button>
          {selectConfig && <div>{selectConfig}</div>}
        </div>
        <button>¿Desea ingresar otra precarga?</button>
      </div>
    </>
  );
};

export default SelectsExistentes;
