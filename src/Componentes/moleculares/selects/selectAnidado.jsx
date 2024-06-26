import React, { useState, useRef, useEffect } from "react";
import Select from "../../atomicos/Select/Select";
import { accessAPI } from "../../../Utils/utils";
import InputField from "../../atomicos/InputField/InputField";

const SelectAnidado = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [endpoint, setEndpoint] = useState("");
  const [selectName, setSelectName] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);

  const [idcompetente, setIdcompetente] = useState(null);

  const tipoSelect = useRef();

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value || event.target.valor;
    setSelectedValue(selectedOption);
    setIdcompetente(selectedOption);
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

  function addSelectExistente(selectPrecargadoid) {
    if (selectPrecargadoid) {
      accessAPI(
        "GET",
        `admin/form/${selectPrecargadoid}`,
        null,
        (response) => {
          setSelectOptions(response.data);
          console.log(response);
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
        <br />
        <div>
          <label htmlFor="selecttipos">Tipos</label>
          <Select
            id="selecttipos"
            selectName="selecttipos"
            ref={tipoSelect}
            onChange={handleTipoSelectChange}
          />
        </div>

        <div>
          <Select
            selectName={"Seleccione una precarga"}
            endpoint={"admin/form/precargas"}
            onChange={handleSelectChange}
            selectedValue={selectedValue}
          />
          <button onClick={() => addSelectExistente(idcompetente)}>
            Utilizar este select
          </button>
        </div>
      </div>
    </>
  );
};

export default SelectAnidado;
