import React, { useState } from "react";
import Label from "../../atomicos/Label/Label.jsx";
import Button from "../../atomicos/Button/Button.jsx";
import CustomInputField from "../CustomInputField/CustomInputField.jsx";
import Select from "../../atomicos/Select/Select.jsx";

import { accessAPI } from "../../../Utils/utils.js";

import ConfigureSelect from "../../moleculares/selects/configureSelect.jsx";
import CreateSelect from "../selects/createSelect.jsx";

export default function CreateDato({ addField, indice, setIndice }) {
  const [fieldData, setFieldData] = useState({
    htmlFor: "",
    id: "",
    name: "",
    labelForm: "",
    placeholder: "",
    info: "",
    regex: "",
    checked: false,
    obl: false,
    indexadoForm: "",
    type: "",
    agrupacionRadio: "",
    selectName: "",
    selectId: "",
  });

  // Sección ERRORES
  const [errorNombreCampo, setErrorNombreCampo] = useState("");
  const [errorIndexado, setErrorIndexado] = useState("");
  const [errorTipoDato, setErrorTipoDato] = useState("");
  const [errorAgruparRadio, setErrorAgruparRadio] = useState("");
  const [errorIdCampo, setErrorIdCampo] = useState("");

  const handleSelectCreate = (selectName, selectId) => {
    setFieldData((fieldData) => ({
      ...fieldData,
      selectName,
      selectId,
    }));
  };

  function validar() {
    let esValido = true;

    // limpiar errores
    setErrorIndexado("");
    setErrorNombreCampo("");
    setErrorTipoDato("");
    setErrorAgruparRadio("");
    setErrorIdCampo("");

    // buscar errores
    if (!fieldData.indexadoForm) {
      setErrorIndexado("El índice no puede estar vacío");
      esValido = false;
    }
    if (!fieldData.labelForm) {
      setErrorNombreCampo("Nombre Campo no puede estar vacío");
      esValido = false;
    }
    if (!fieldData.type) {
      setErrorTipoDato("Debe elegir un tipo de dato");
      esValido = false;
    }
    if (!fieldData.id) {
      setErrorIdCampo("Debe ingresar un identificador para el campo");
      esValido = false;
    }
    if (!fieldData.agrupacionRadio && fieldData.type === "radio") {
      setErrorAgruparRadio(
        "Debe establecer una agrupación para el tipo de input radio"
      );
      esValido = false;
    }

    return esValido;
  }

  function crearCampoString() {
    if (validar()) {
      accessAPI(
        "POST",
        "admin/form/campo",
        fieldData,
        (response) => {
          console.log(response);
        },
        (response) => {
          console.log(response);
        }
      );
      addField({ ...fieldData, indice });

      setIndice(indice + 1);

      // Limpiar los estados después de agregar el campo
      setFieldData({
        htmlFor: "",
        id: "",
        labelForm: "",
        name: "",
        placeholder: "",
        info: "",
        regex: "",
        obl: "",
        indexadoForm: "",
        type: "",
        checkbox: false,
        agrupacionRadio: "",
        selectName: "",
        selectId: "",
      });
    }
  }

  return (
    <>
      <div
        style={{
          //border: '1px solid red',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "5px 0 5px 10px",
        }}
      >
        <Label labelForm={"Tipo de Campo *"} htmlFor={"dato"} />
        <Select
          id="dato"
          value={fieldData.type}
          onChange={(e) => setFieldData({ ...fieldData, type: e.target.value })}
          endpoint={"admin/form/tiposcampos"}
          error={errorTipoDato ? errorTipoDato : ""}
        />
      </div>

      {fieldData.type === "7" && (
        <div>
          <CustomInputField
            id={"agrupacionRadio"}
            labelForm={"Agrupación Radio *"}
            name={"agrupacionRadio"}
            htmlFor={"agrupacionRadio"}
            type={"text"}
            required={true}
            value={fieldData.agrupacionRadio}
            onChange={(e) =>
              setFieldData({ ...fieldData, agrupacionRadio: e.target.value })
            }
            error={errorAgruparRadio ? errorAgruparRadio : ""}
          />
        </div>
      )}

      {fieldData.type !== "" && (
        <>
          <div>
            <CustomInputField
              id={"indice"}
              labelForm={"Indice *"}
              name={"indice"}
              placeholder={"Asigne índice al campo"}
              htmlFor={"indice"}
              type={"text"}
              value={fieldData.indexadoForm}
              onChange={(e) =>
                setFieldData({ ...fieldData, indexadoForm: e.target.value })
              }
              error={errorIndexado ? errorIndexado : ""}
            />
          </div>
          <div>
            <CustomInputField
              id={"idCampo"}
              labelForm={"Identificador Campo *"}
              name={"idCampo"}
              htmlFor={"idCampo"}
              placeholder={"Asigne un id al campo"}
              type={"text"}
              value={fieldData.id}
              onChange={(e) =>
                setFieldData({
                  ...fieldData,
                  id: e.target.value,
                  htmlFor: e.target.value,
                })
              }
              error={errorIdCampo ? errorIdCampo : ""}
            />
          </div>
          <div>
            <CustomInputField
              id={"fieldName"}
              labelForm={"Nombre Campo *"}
              name={"fieldName"}
              htmlFor={"fieldName"}
              placeholder={"Texto que tendrá el campo"}
              type={"text"}
              value={fieldData.labelForm}
              onChange={(e) =>
                setFieldData({ ...fieldData, labelForm: e.target.value })
              }
              error={errorNombreCampo ? errorNombreCampo : ""}
            />
          </div>
        </>
      )}

      {fieldData.type !== "3" &&
        fieldData.type !== "14" &&
        fieldData.type !== "7" &&
        fieldData.type !== "4" &&
        fieldData.type !== "2" &&
        fieldData.type !== "" && (
          <div>
            <CustomInputField
              id={"placeholder"}
              labelForm={"Placeholder"}
              name={"placeholder"}
              htmlFor={"placeholder"}
              type={"text"}
              value={fieldData.placeholder}
              onChange={(e) =>
                setFieldData({ ...fieldData, placeholder: e.target.value })
              }
            />
          </div>
        )}

      {fieldData.type !== "" && (
        <div>
          <CustomInputField
            id={"info"}
            labelForm={"Info"}
            name={"info"}
            htmlFor={"info"}
            type={"text"}
            value={fieldData.info}
            onChange={(e) =>
              setFieldData({ ...fieldData, info: e.target.value })
            }
          />
        </div>
      )}

      {fieldData.type === "select" && (
        <div>
          <CreateSelect onCreate={handleSelectCreate} />
        </div>
      )}

      {fieldData.type !== "textarea" &&
        fieldData.type !== "checkbox" &&
        fieldData.type !== "select" &&
        fieldData.type !== "date" &&
        fieldData.type !== "file" &&
        fieldData.type !== "radio" &&
        fieldData.type !== "section" &&
        fieldData.type !== "" && (
          <div>
            <CustomInputField
              id={"regex"}
              labelForm={"Regex"}
              name={"regex"}
              htmlFor={"regex"}
              type={"text"}
              value={fieldData.regex}
              onChange={(e) =>
                setFieldData({ ...fieldData, regex: e.target.value })
              }
            />
          </div>
        )}

      <div>
        <ConfigureSelect />
      </div>

      <div>
        {fieldData.type !== "" && fieldData.type !== "section" && (
          <div
            style={{
              //border: '1px solid red',
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <CustomInputField
              id={"campoObligatorio"}
              labelForm={"Obligatorio"}
              name={"campoObligatorio"}
              htmlFor={"campoObligatorio"}
              type={"checkbox"}
              checked={fieldData.obl}
              onChange={(e) =>
                setFieldData({ ...fieldData, obl: e.target.checked })
              }
            />
          </div>
        )}

        <Button type="submit" onClick={crearCampoString} text="Crear Campo" />
      </div>
      <br />
    </>
  );
}
