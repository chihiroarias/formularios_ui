import React, { useState } from "react";
import Label from "../../atomicos/Label/Label.jsx";
import Button from "../../atomicos/Button/Button.jsx";
import CustomInputField from "../CustomInputField/CustomInputField.jsx";
// import Select from "../../atomicos/Select/Select.jsx";
import SelectsExistentes from "../selects/selectsDelSistema.jsx";
import { selectDato } from "../../../Utils/selectDatoUtils.js";
import SelectOptionGroup from "../../atomicos/Select/SelectOptionGroup.jsx";
// import ConfigureSelect from "../../moleculares/selects/configureSelect.jsx";
import CreateSelect from "../selects/createSelect.jsx";
import SelectsPrecargado from "../selects/selectsPrecarga.jsx";

export default function CreateDato({ addField, indice, setIndice }) {
  const [ordenCampo, setOrdenCampo] = useState(0);
  const [fieldData, setFieldData] = useState({
    htmlFor: "",
    id: "",
    name: "",
    labelForm: "",
    placeholder: "",
    info: "",
    regex: "",
    checked: false,
    required: false,
    indexadoForm: "",
    type: "",
    agrupacionRadio: "",
    selectName: "",
    selectPrecargadoId: "",
    endpoint: "",
    ordenCampo: 0,
  });

  // Sección ERRORES
  const [errorNombreCampo, setErrorNombreCampo] = useState("");
  const [errorIndexado, setErrorIndexado] = useState("");
  const [errorTipoDato, setErrorTipoDato] = useState("");
  const [errorAgruparRadio, setErrorAgruparRadio] = useState("");
  const [errorIdCampo, setErrorIdCampo] = useState("");

  function handleSelectCreate(selectName, selectPrecargadoId) {
    setFieldData((fieldData) => ({
      ...fieldData,
      selectName,
      selectPrecargadoId,
    }));
  }

  function handleSelectPrecarga(endpoint) {
    setFieldData((fieldData) => ({
      ...fieldData,
      endpoint,
    }));
  }

  function validar() {
    let esValido = true;

    // limpiar errores
    setErrorIndexado("");
    setErrorNombreCampo("");
    setErrorTipoDato("");
    setErrorAgruparRadio("");
    setErrorIdCampo("");

    // buscar errores
    if (!fieldData.type) {
      setErrorTipoDato("Debe elegir un tipo de campo");
      esValido = false;
    } else {
      if (!fieldData.indexadoForm) {
        setErrorIndexado("El índice no puede estar vacío");
        esValido = false;
      }
      if (!fieldData.labelForm) {
        setErrorNombreCampo("Nombre Campo no puede estar vacío");
        esValido = false;
      }
      if (!fieldData.id && fieldData.type !== "section") {
        setErrorIdCampo("Debe ingresar un identificador para el campo");
        esValido = false;
      }
      if (!fieldData.agrupacionRadio && fieldData.type === "radio") {
        setErrorAgruparRadio(
          "Debe establecer una agrupación para el tipo de input radio"
        );
        esValido = false;
      }
    }
    return esValido;
  }

  function crearCampoString() {
    if (validar()) {
      setOrdenCampo(ordenCampo + 1);

      addField({ ...fieldData, indice, ordenCampo });

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
        required: false,
        indexadoForm: "",
        type: "",
        checkbox: false,
        agrupacionRadio: "",
        selectName: "",
        selectPrecargadoId: "",
        endpoint: "",
        ordenCampo,
      });
    }
  }

  return (
    <>
      <div className="mt-5">
        <Label labelForm={"Tipo de Campo *"} htmlFor={"dato"} />
        <SelectOptionGroup
          id="dato"
          value={fieldData.type}
          onChange={(e) => setFieldData({ ...fieldData, type: e.target.value })}
          options={selectDato}
          error={errorTipoDato ? errorTipoDato : ""}
        />
      </div>

      {fieldData.type === "radio" && (
        <div>
          <CustomInputField
            id={"agrupacionRadio"}
            labelForm={"Agrupación Radio"}
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
              id={"indexado"}
              labelForm={"Indexado"}
              name={"indexado"}
              placeholder={"Asigne indexado al campo"}
              htmlFor={"indexado"}
              type={"text"}
              value={fieldData.indexadoForm}
              required={true}
              onChange={(e) =>
                setFieldData({ ...fieldData, indexadoForm: e.target.value })
              }
              error={errorIndexado ? errorIndexado : ""}
            />
          </div>

          {fieldData.type !== "section" && (
            <div>
              <CustomInputField
                id={"idCampo"}
                labelForm={"Identificador Campo"}
                name={"idCampo"}
                htmlFor={"idCampo"}
                placeholder={"Asigne un id al campo"}
                type={"text"}
                required={true}
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
          )}
          <div>
            <CustomInputField
              id={"fieldName"}
              labelForm={"Nombre Campo"}
              name={"fieldName"}
              htmlFor={"fieldName"}
              required={true}
              placeholder={"Texto del campo"}
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

      {fieldData.type !== "checkbox" &&
        fieldData.type !== "select" &&
        fieldData.type !== "sExistentes" &&
        fieldData.type !== "file" &&
        fieldData.type !== "radio" &&
        fieldData.type !== "date" &&
        fieldData.type !== "sPrecargado" &&
        fieldData.type !== "section" &&
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

      {fieldData.type !== "" &&
       fieldData.type !== "section" && (
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

      {fieldData.type === "sExistentes" && (
        <div>
          <SelectsExistentes onCreate={handleSelectCreate} />
        </div>
      )}

      {fieldData.type === "sPrecargado" && (
        <div>
          <SelectsPrecargado onCreate={handleSelectPrecarga} />
        </div>
      )}

      {fieldData.type !== "textarea" &&
        fieldData.type !== "checkbox" &&
        fieldData.type !== "select" &&
        fieldData.type !== "sExistentes" &&
        fieldData.type !== "sPrecargado" &&
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
        {fieldData.type !== "" && fieldData.type !== "section" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Label htmlFor={"required"} labelForm={"Obligatorio"} />
            <input
              className="mb-2"
              type={"checkbox"}
              id={"required"}
              onChange={(e) =>
                setFieldData({ ...fieldData, required: e.target.checked })
              }
              checked={fieldData.required}
            />
          </div>
        )}
      </div>
      <Button
        text="Agregar Campo"
        onClick={() => {
          crearCampoString();
        }}
      />
    </>
  );
}
