import { useState, useEffect } from "react";
import { accessAPI } from "../../../Utils/utils";
import { useParams } from "react-router-dom";
import MenuNavegacion from "../menuNavegacion/menuNavegacion.js";
import Loader from "../../../elementos/loader/Loader";
import "./formularios.css";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm";
import EditFieldData from "./EditFieldData";
import { MdEdit } from "react-icons/md";

export default function Formularios() {
  const [loader, setLoader] = useState(true);
  const [loaderFormulario, setLoaderFormulario] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState();
  const [formularios, setFormularios] = useState([]);
  const [formulario, setFormulario] = useState(null);
  const [campoEnEdicion, setCampoEnEdicion] = useState(null);

  const { formularioId } = useParams();

  useEffect(() => {
    accessAPI(
      "GET",
      "admin/form/formularios/listadoformulario",
      null,
      (response) => {
        setFormularios(response);
        setLoader(false);
      },
      (response) => {
        console.log(response);
      }
    );
    setFormularioSeleccionado(formularioId);
  }, [formularioId]);

  useEffect(() => {
    if (formularios) {
      setLoader(false);
    }
  }, [formularios]);

  useEffect(() => {
    if (formularioSeleccionado) {
      setFormulario(null);
      setLoaderFormulario(true);
      accessAPI(
        "GET",
        `admin/form/formversion/${formularioSeleccionado}`,
        null,
        (response) => {
          console.log(response);
          setFormulario(response);
          setLoaderFormulario(false);
        },
        (response) => {
          console.log(response);
          setLoaderFormulario(false);
          setFormularioSeleccionado(null);
        }
      );
    }
  }, [formularioSeleccionado]);

  const updateField = (updatedField) => {
    setFormulario((prevForm) => {
      const updatedFields = prevForm.campos.map((campo) =>
        campo.id === updatedField.id ? updatedField : campo
      );
      return { ...prevForm, campos: updatedFields };
    });
    setCampoEnEdicion(null);
  };

  const cancelEdit = () => {
    setCampoEnEdicion(null);
  };

  return (
    <div className="seccion laboratorio">
      <MenuNavegacion submenuSeleccionado="formularios" />
      <div className="contenido">
        {loader && <Loader>Cargando formulario</Loader>}
        {!loader && formularios && (
          <>
            <div className="tarjetasLaboratoriosContainer flexContainer">
              <div className="tarjeta listadoLaboratorios mt-24 px-10">
                <h1>Listado de formularios</h1>
                {formularios.map((form) => (
                  <div
                    className={
                      formularioSeleccionado === form.formid
                        ? "laboratorio seleccionado"
                        : "laboratorio"
                    }
                    key={form.formid}
                  >
                    <div
                      onClick={() => {
                        setFormularioSeleccionado(form.formid);
                      }}
                    >
                      {form.formulario.codigo + " - " + form.formulario.titulo}
                    </div>
                  </div>
                ))}
              </div>
              {!formulario && loaderFormulario && (
                <Loader>Cargando detalles del formulario</Loader>
              )}
              {formulario && (
                <div>
                  <div className="tarjeta laboratorioSeleccionado mt-24 px-10">
                    <h1 className="pt-2">
                      {formulario.formulario.codigo} -{" "}
                      {formulario.formulario.titulo}
                      {" - "}{" "}
                    </h1>
                    <p>Descripción: {formulario.formulario.descripcion}</p>
                    {formulario.campos && formulario.campos.length > 0 ? (
                      formulario.campos.map((campo) =>
                        campoEnEdicion && campoEnEdicion.id === campo.id ? (
                          <div key={campo.id}>
                            <EditFieldData
                              fieldData={campoEnEdicion}
                              updateField={updateField}
                              cancelEdit={cancelEdit}
                            />
                            <br />
                          </div>
                        ) : (
                          <div key={campo.id}>
                            <div className="flex items-center grid grid-cols-2 gap-3">
                              <MuestraCampoForm
                                formversionid={campo.formversionid}
                                labelForm={campo.labelForm}
                                htmlFor={campo.htmlFor}
                                placeholder={campo.placeholder}
                                agrupacionRadio={campo.agrupacionRadio}
                                regex={campo.regex}
                                info={campo.info}
                                indexadoForm={campo.indexadoForm}
                                endpoint={campo.endpoint}
                                condicional={campo.condicional}
                                required={campo.required}
                                selectPrecargadoId={campo.selectPrecargadoId}
                                id={campo.id}
                                type={campo.type}
                              />
                              <MdEdit
                                className={"edit-icon ml-5"}
                                onClick={() => setCampoEnEdicion(campo)}
                              />
                            </div>
                          </div>
                        )
                      )
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
