import { useState, useEffect } from "react";
import { accessAPI } from "../../../Utils/utils";
import MenuNavegacion from "../menuNavegacion/menuNavegacion.js";
import Loader from "../../../elementos/loader/Loader";
import "./formularios.css";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm";

export default function Formularios() {
  const [loader, setLoader] = useState(true);
  const [loaderFormulario, setLoaderFormulario] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState();
  const [formularios, setFormularios] = useState([]);
  const [formulario, setFormulario] = useState(null);

  // Trae todos los formularios
  useEffect(() => {
    accessAPI(
      "GET",
      "admin/form/formularios/listadoformulario",
      null,
      (response) => {
        setLoader(false);
        console.log(response);
        setFormularios(response);
      },
      (response) => {
        console.log(response);
      }
    );
  }, []);

  // Cuando se selecciona un formulario en específico se cargan sus datos
  useEffect(() => {
    if (formularioSeleccionado) {
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
        }
      );
    }
  }, [formularioSeleccionado]);

  return (
    <div>
      <MenuNavegacion submenuSeleccionado="formularios" />
      <div>
        {loader && <Loader>Cargando formulario</Loader>}
        <div className="tarjetasLaboratoriosContainer flexContainer">
          <div className="tarjeta listadoLaboratorios">
            <h1>Listado de formularios</h1>
            {formularios && formularios.length > 0 ? (
              formularios.map((form) => (
                <div
                  className={
                    formularioSeleccionado === form.id
                      ? "laboratorio seleccionado"
                      : "laboratorio"
                  }
                  key={form.id}
                >
                  <div onClick={() => setFormularioSeleccionado(form.id)}>
                    {form.codigo}
                  </div>
                </div>
              ))
            ) : (
              <p>No hay formularios disponibles.</p>
            )}
          </div>
          {!formulario && loaderFormulario && (
            <Loader>Cargando detalles del formulario</Loader>
          )}
          {formulario && (
            <div>
              <div className="tarjeta laboratorioSeleccionado">
                <h1>Formulario: {formulario.codigo}</h1>
                <p>Descripción: {formulario.descripcion}</p>
                <p>Código: {formulario.codigo}</p>
                {formulario.campos && formulario.campos.length > 0 ? (
                  formulario.campos.map((campo) => (
                    <MuestraCampoForm
                      key={campo.id}
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
                  ))
                ) : (
                  <p>No hay campos disponibles para este formulario.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
