import React, { useState, useEffect } from "react";
import CampoEditable from "../../elementos/campoEditable/CampoEditable";
import Loader from "../../elementos/loader/Loader";
import { accessAPI } from "../../../Utils/utils";
import { useParams } from "react-router-dom";

export default function CamposEditables() {
  const [loader, setLoader] = useState(true);
  const [campos, setCampos] = useState([]);
  const [mensajeNotificacion, setMensajeNotificacion] = useState();

  const { formularioId } = useParams();

  useEffect(() => {
    accessAPI(
      "GET",
      `admin/form/formversion/${formularioId}`,
      null,
      (response) => {
        setCampos(response.campos);
        setLoader(false);
      },
      (error) => {
        setMensajeNotificacion({
          mensaje: error.message,
          temporal: true,
          error: true,
        });
        setLoader(false);
      }
    );
  }, [formularioId]);

  return (
    <div>
      {loader && <Loader>Cargando campos...</Loader>}
      {!loader &&
        campos.length > 0 &&
        campos.map((campo) => (
          <CampoEditable
            key={campo.id}
            etiqueta={campo.labelForm}
            campo={campo.name}
            valor={campo.value}
            entidadid={campo.id}
            endpoint={`admin/form/formversion/${formularioId}`}
            dropdownurl={campo.selectEndpoint}
            dropdownopciones={campo.dropdownOpciones}
          />
        ))}
    </div>
  );
}
