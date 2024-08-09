import React, { useState, useEffect } from "react";
import { accessAPI } from "../../../Utils/utils";
import { useParams } from "react-router-dom";
import MenuNavegacion from "../menuNavegacion/menuNavegacion.js";
import Loader from "../../../elementos/loader/Loader";
import "./formularios.css";
import CamposEditables from "./EditFieldData.jsx";

export default function EditorFormulario() {
  const [loader, setLoader] = useState(true);
  const [formulario, setFormulario] = useState(null);

  const { formularioId } = useParams();

  useEffect(() => {
    if (formularioId) {
      accessAPI(
        "GET",
        `admin/form/formversion/${formularioId}`,
        null,
        (response) => {
          setFormulario(response);
          setLoader(false);
        },
        (response) => {
          console.log(response);
        }
      );
      setLoader(false);
    }
  }, [formularioId]);

  //Setea el loader dependiendo de si llegaron los datos
  useEffect(() => {
    if (formulario) {
      setLoader(false);
    }
  }, [formulario]);

  return (
    <div className="seccion laboratorio">
      <MenuNavegacion submenuSeleccionado="formularios" />
      <div className="contenido">
        {loader && <Loader>Cargando formularios</Loader>}
        <CamposEditables formularioId={formularioId} />
      </div>
    </div>
  );
}
