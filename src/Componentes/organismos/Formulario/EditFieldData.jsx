import React, { useState, useEffect } from "react";
import CampoEditable from "../../../elementos/campoEditable/CampoEditable.js";

export default function EditFieldData({ fieldData, updateField }) {
  const [localData, setLocalData] = useState(fieldData || {});


  useEffect(() => {
    setLocalData(fieldData || {});
  }, [fieldData]);


  return (
    <>
      {localData.type === "radio" && (
        <div>
          <CampoEditable
            etiqueta="Agrupación Radio"
            campo="agrupacionRadio"
            valor={localData.agrupacionRadio}
            entidadid={localData.campoid}
            endpoint="admin/form"
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
              entidadid={localData.campoid}
              endpoint="admin/form"
            />
          </div>
          <div>
            <CampoEditable
              etiqueta="Identificador Campo"
              campo="id"
              valor={localData.id}
              entidadid={localData.campoid}
              endpoint="admin/form"
            />
          </div>
          <div>
            <CampoEditable
              etiqueta="Nombre Campo"
              campo="labelForm"
              valor={localData.labelForm}
              entidadid={localData.campoid}
              endpoint="admin/form"
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
              entidadid={localData.campoid}
              endpoint="admin/form"
            />
          </div>
        )}

      {localData.type && (
        <div>
          <CampoEditable
            etiqueta="Info"
            campo="info"
            valor={localData.info}
            entidadid={localData.campoid}
            endpoint="admin/form"
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
              entidadid={localData.campoid}
              endpoint="admin/form"
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
              entidadid={localData.campoid}
              endpoint="admin/form"
              booleano={true}
            />
          </div>
        )}
      </div>
      <br />
    </>
  );
}
