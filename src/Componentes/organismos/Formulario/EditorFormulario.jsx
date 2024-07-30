import React, { useState, useEffect } from "react";
import { accessAPI } from "../../../Utils/utils";
import { useParams } from "react-router-dom";
import MenuNavegacion from "../menuNavegacion/menuNavegacion.js";
import Loader from "../../../elementos/loader/Loader";
import "./formularios.css";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm";
import CampoEditable from "../../../elementos/campoEditable/CampoEditable.js";
import { MdDelete } from "react-icons/md";

export default function EditorFormulario() {
  const [loader, setLoader] = useState(true);
  const [loaderFormulario, setLoaderFormulario] = useState(false);
  const [formulario, setFormulario] = useState(null);
  const [editField, setEditField] = useState(null); // Estado para el campo a editar

  const { formularioId } = useParams();

  useEffect(() => {
    if (formularioId) {
      accessAPI(
        "GET",
        `admin/form/formversion/${formularioId}`,
        null,
        (response) => {
          setFormulario(response);
          setLoaderFormulario(false);
        },
        (response) => {
          console.log(response);
          setLoaderFormulario(false);
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

  // Elimina un campo del formulario
  const deleteField = (fieldId) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      campos: prevFormulario.campos.filter((campo) => campo.id !== fieldId),
    }));
  };

  // Maneja la edición de un campo
  const handleEditField = (field) => {
    setEditField(field);
  };

  // Actualiza el campo editado
  const updateField = (updatedField) => {
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      campos: prevFormulario.campos.map((campo) =>
        campo.id === updatedField.id ? updatedField : campo
      ),
    }));
    setEditField(null);
  };

  return (
    <div className="seccion laboratorio">
      <MenuNavegacion submenuSeleccionado="formularios" />
      <div className="contenido">
        {loader && <Loader>Cargando formulario</Loader>}
        {!loader && formulario && (
          <>
            <div className="tarjetasLaboratoriosContainer flexContainer">
              {!formulario && loaderFormulario && (
                <Loader>Cargando detalles del formulario</Loader>
              )}
              {formulario && (
                <div>
                  <div className="tarjeta laboratorioSeleccionado mt-24 px-10">
                    <h1 className="pt-2">
                      {formulario.formulario.codigo} -{" "}
                      {formulario.formulario.titulo}
                    </h1>
                    <p>Descripción: {formulario.formulario.descripcion}</p>
                    {formulario.campos && formulario.campos.length > 0 ? (
                      formulario.campos.map((campo) => (
                        <div className="campo-container" key={campo.id}>
                          {editField && editField.id === campo.id ? (
                            <></>
                          ) : (
                            <MuestraCampoForm {...campo} />
                          )}
                          <button
                            className="edit-button"
                            onClick={() => handleEditField(campo)}
                          >
                            Editar
                          </button>
                          <MdDelete
                            className="delete-icon ml-5"
                            onClick={() => deleteField(campo.id)}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No hay campos disponibles para este formulario.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
