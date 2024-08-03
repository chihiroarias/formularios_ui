import React, { useState, useEffect } from "react";
import Label from "../../atomicos/Label/Label.jsx";
import Button from "../../atomicos/Button/Button.jsx";
import CampoEditable from "../../../elementos/campoEditable/CampoEditable.js";
import { selectDato } from "../../../Utils/selectDatoUtils.js";
import { accessAPI } from "../../../Utils/utils.js";

export default function EditFieldData({ fieldData, updateField }) {
  const [localData, setLocalData] = useState(fieldData || {});

  const [errorNombreCampo, setErrorNombreCampo] = useState("");
  const [errorIndexado, setErrorIndexado] = useState("");
  const [errorTipoDato, setErrorTipoDato] = useState("");
  const [errorAgruparRadio, setErrorAgruparRadio] = useState("");
  const [errorIdCampo, setErrorIdCampo] = useState("");

  useEffect(() => {
    setLocalData(fieldData || {});
  }, [fieldData]);

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
    console.log(localData);
    accessAPI(
      "GET",
      `admin/form/formversion/${localData.campoid}`,
      localData,
      (response) => {
        console.log(response);
      },
      (response) => {
        console.log(response);
      }
    );
  }

  return (
    <>
      <div className="mt-5">
        <Label labelForm={"Tipo de Campo *"} htmlFor={"dato"} />
        <CampoEditable
          etiqueta="Tipo de Campo"
          campo="type"
          valor={localData.type}
          entidadid={localData.id}
          endpoint="admin/form/formversion"
          dropdownopciones={selectDato}
        />
      </div>

      {localData.type === "radio" && (
        <div>
          <CampoEditable
            etiqueta="Agrupación Radio"
            campo="agrupacionRadio"
            valor={localData.agrupacionRadio}
            entidadid={localData.id}
            endpoint="admin/form/formversion"
          />
        </div>
      )}

      {localData.type && (
        <>
          <div>
            <CampoEditable
              etiqueta="Indexado"
              campo="indexadoForm"
              valor={localData.indexadoForm}
              entidadid={localData.id}
              endpoint="admin/form/formversion"
            />
          </div>
          <div>
            <CampoEditable
              etiqueta="Identificador Campo"
              campo="id"
              valor={localData.id}
              entidadid={localData.id}
              endpoint="admin/form/formversion"
            />
          </div>
          <div>
            <CampoEditable
              etiqueta="Nombre Campo"
              campo="labelForm"
              valor={localData.labelForm}
              entidadid={localData.id}
              endpoint="admin/form/formversion"
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
            <CampoEditable
              etiqueta="Placeholder"
              campo="placeholder"
              valor={localData.placeholder}
              entidadid={localData.id}
              endpoint="admin/form/formversion"
            />
          </div>
        )}

      {localData.type && (
        <div>
          <CampoEditable
            etiqueta="Info"
            campo="info"
            valor={localData.info}
            entidadid={localData.id}
            endpoint="admin/form/formversion"
          />
        </div>
      )}

      {localData.type === "select" && (
        <div>
          {/* Aquí necesitarás manejar la lógica específica para selects */}
        </div>
      )}

      {localData.type === "sExistentes" && (
        <div>
          {/* Aquí necesitarás manejar la lógica específica para selects existentes */}
        </div>
      )}

      {localData.type === "sPrecargado" && (
        <div>
          {/* Aquí necesitarás manejar la lógica específica para selects precargados */}
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
            <CampoEditable
              etiqueta="Regex"
              campo="regex"
              valor={localData.regex}
              entidadid={localData.id}
              endpoint="admin/form/formversion"
            />
          </div>
        )}

      <div>
        {localData.type && localData.type !== "section" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <CampoEditable
              etiqueta="Obligatorio"
              campo="required"
              valor={localData.required}
              entidadid={localData.id}
              endpoint="admin/form/formversion"
              esBooleano={true}
            />
          </div>
        )}

        <Button
          type="submit"
          onClick={actualizarCampo}
          text="Actualizar Campo"
        />
      </div>
      <br />
    </>
  );
}