import React, { useState, useEffect } from "react";
import Label from "../../atomicos/Label/Label.jsx";
import Button from "../../atomicos/Button/Button.jsx";
import CustomInputField from "../../moleculares/CustomInputField/CustomInputField.jsx";
import SelectOptionGroup from "../../atomicos/Select/SelectOptionGroup.jsx";
import CreateSelect from "../../moleculares/selects/createSelect.jsx";
import SelectsExistentes from "../../moleculares/selects/selectsDelSistema.jsx";
import SelectsPrecargado from "../../moleculares/selects/selectsPrecarga.jsx";
import { selectDato } from "../../../Utils/selectDatoUtils.js";

export default function EditFormData({ fieldData, updateField }) {
  const [localData, setLocalData] = useState(fieldData || {});

  const [errorNombreCampo, setErrorNombreCampo] = useState("");
  const [errorIndexado, setErrorIndexado] = useState("");
  const [errorTipoDato, setErrorTipoDato] = useState("");
  const [errorAgruparRadio, setErrorAgruparRadio] = useState("");
  const [errorIdCampo, setErrorIdCampo] = useState("");

  useEffect(() => {
    setLocalData(fieldData || {});
  }, [fieldData]);

  const handleSelectCreate = (selectName, selectId) => {
    setLocalData((prevData) => ({
      ...prevData,
      selectName,
      selectId,
    }));
  };

  const handleSelectPrecarga = (selectEndpoint) => {
    setLocalData((prevData) => ({
      ...prevData,
      selectEndpoint,
    }));
  };

  function validar() {
    let esValido = true;

    setErrorIndexado("");
    setErrorNombreCampo("");
    setErrorTipoDato("");
    setErrorAgruparRadio("");
    setErrorIdCampo("");

    if (!localData.type) {
      setErrorTipoDato("Debe elegir un tipo de campo");
      esValido = false;
    } else {
      if (!localData.indexadoForm) {
        setErrorIndexado("El índice no puede estar vacío");
        esValido = false;
      }
      if (!localData.labelForm) {
        setErrorNombreCampo("Nombre Campo no puede estar vacío");
        esValido = false;
      }
      if (!localData.id) {
        setErrorIdCampo("Debe ingresar un identificador para el campo");
        esValido = false;
      }
      if (!localData.agrupacionRadio && localData.type === "radio") {
        setErrorAgruparRadio(
          "Debe establecer una agrupación para el tipo de input radio"
        );
        esValido = false;
      }
    }
    return esValido;
  }

  function actualizarCampo() {
    if (validar()) {
      updateField(localData);
    }
  }

  return (
    <>
      <div className="mt-5">
        <Label labelForm={"Tipo de Campo *"} htmlFor={"dato"} />
        <SelectOptionGroup
          id="dato"
          value={localData.type || ""}
          onChange={(e) => setLocalData({ ...localData, type: e.target.value })}
          options={selectDato}
          error={errorTipoDato ? errorTipoDato : ""}
        />
      </div>

      {localData.type === "radio" && (
        <div>
          <CustomInputField
            id={"agrupacionRadio"}
            labelForm={"Agrupación Radio"}
            name={"agrupacionRadio"}
            htmlFor={"agrupacionRadio"}
            type={"text"}
            required={true}
            value={localData.agrupacionRadio || ""}
            onChange={(e) =>
              setLocalData({ ...localData, agrupacionRadio: e.target.value })
            }
            error={errorAgruparRadio ? errorAgruparRadio : ""}
          />
        </div>
      )}

      {localData.type && (
        <>
          <div>
            <CustomInputField
              id={"indexado"}
              labelForm={"Indexado"}
              name={"indexado"}
              placeholder={"Asigne indexado al campo"}
              htmlFor={"indexado"}
              type={"text"}
              value={localData.indexadoForm || ""}
              required={true}
              onChange={(e) =>
                setLocalData({ ...localData, indexadoForm: e.target.value })
              }
              error={errorIndexado ? errorIndexado : ""}
            />
          </div>
          <div>
            <CustomInputField
              id={"idCampo"}
              labelForm={"Identificador Campo"}
              name={"idCampo"}
              htmlFor={"idCampo"}
              placeholder={"Asigne un id al campo"}
              type={"text"}
              required={true}
              value={localData.id || ""}
              onChange={(e) =>
                setLocalData({
                  ...localData,
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
              labelForm={"Nombre Campo"}
              name={"fieldName"}
              htmlFor={"fieldName"}
              required={true}
              placeholder={"Texto del campo"}
              type={"text"}
              value={localData.labelForm || ""}
              onChange={(e) =>
                setLocalData({ ...localData, labelForm: e.target.value })
              }
              error={errorNombreCampo ? errorNombreCampo : ""}
            />
          </div>
        </>
      )}

      {localData.type &&
        ![
          "checkbox",
          "select",
          "sExistentes",
          "file",
          "radio",
          "date",
          "section",
        ].includes(localData.type) && (
          <div>
            <CustomInputField
              id={"placeholder"}
              labelForm={"Placeholder"}
              name={"placeholder"}
              htmlFor={"placeholder"}
              type={"text"}
              value={localData.placeholder || ""}
              onChange={(e) =>
                setLocalData({ ...localData, placeholder: e.target.value })
              }
            />
          </div>
        )}

      {localData.type && (
        <div>
          <CustomInputField
            id={"info"}
            labelForm={"Info"}
            name={"info"}
            htmlFor={"info"}
            type={"text"}
            value={localData.info || ""}
            onChange={(e) =>
              setLocalData({ ...localData, info: e.target.value })
            }
          />
        </div>
      )}

      {localData.type === "select" && (
        <div>
          <CreateSelect onCreate={handleSelectCreate} />
        </div>
      )}

      {localData.type === "sExistentes" && (
        <div>
          <SelectsExistentes onCreate={handleSelectCreate} />
        </div>
      )}

      {localData.type === "sPrecargado" && (
        <div>
          <SelectsPrecargado onCreate={handleSelectPrecarga} />
        </div>
      )}

      {localData.type &&
        ![
          "textarea",
          "checkbox",
          "select",
          "sExistentes",
          "sPrecargado",
          "date",
          "file",
          "radio",
          "section",
        ].includes(localData.type) && (
          <div>
            <CustomInputField
              id={"regex"}
              labelForm={"Regex"}
              name={"regex"}
              htmlFor={"regex"}
              type={"text"}
              value={localData.regex || ""}
              onChange={(e) =>
                setLocalData({ ...localData, regex: e.target.value })
              }
            />
          </div>
        )}

      {localData.type && localData.type !== "section" && (
        <div
          style={{
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
            checked={localData.required || false}
            onChange={(e) =>
              setLocalData({ ...localData, required: e.target.checked })
            }
          />
        </div>
      )}

      <Button type="submit" onClick={actualizarCampo} text="Actualizar Campo" />
      <br />
    </>
  );
}
