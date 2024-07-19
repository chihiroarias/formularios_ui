import { useState, useEffect } from "react";
import { accessAPI } from "../../../Utils/utils";
import { useParams } from "react-router-dom";
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

  const { formularioId } = useParams();

  // Trae todos los formularios
  useEffect(() => {
    accessAPI(
      "GET",
      "admin/form/formularios/listadoformulario",
      null,
      (response) => {
        console.log(response);
        setFormularios(response);
        setLoader(false);
      },
      (response) => {
        console.log(response);
      }
    );
    setFormularioSeleccionado(formularioId);
  }, [formularioId]);

  //Setea el loader dependiendo de si llegaron los datos
  useEffect(() => {
    if (formularios) {
      setLoader(false);
    }
  }, [formularios]);

  // Cuando se selecciona un formulario en específico se cargan sus datos
  useEffect(() => {
    if (formularioSeleccionado) {
      setFormulario();
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
          setFormularioSeleccionado();
        }
      );
    }
  }, [formularioSeleccionado]);

  return (
    <div className="seccion laboratorio ">
      <MenuNavegacion submenuSeleccionado="formularios" />
      <div className="contenido">
        {loader && <Loader>Cargando formulario</Loader>}
        {!loader && formularios && (
          <>
            <div className="tarjetasLaboratoriosContainer flexContainer">
              <div className="tarjeta listadoLaboratorios  mt-24 px-10">
                <h1>Listado de formularios</h1>
                {formularios.map((form) => {
                  return (
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
                        {form.formulario.codigo +
                          " - " +
                          form.formulario.titulo}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!formulario && loaderFormulario && (
                <Loader>Cargando detalles del formulario</Loader>
              )}
              {formulario && (
                <div>
                  <div className="tarjeta laboratorioSeleccionado  mt-24 px-10">
                    <h1 className="pt-2">{formulario.formulario.codigo} - {formulario.formulario.titulo}</h1>
                    <p>Descripción: {formulario.formulario.descripcion}</p>
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
          </>
        )}
      </div>
    </div>
  );
}

/**
 
  return (
    <div>
      <MenuNavegacion submenuSeleccionado="formularios" />
      <div>
        {loader && <Loader>Cargando formulario</Loader>}
        {!loader && formularios && (
          <>
            <div className="tarjetasLaboratoriosContainer flexContainer">
              <div className="tarjeta listadoLaboratorios">
                <h1>Listado de formularios</h1>
                {formularios.map((form) => {
                  return (
                    <div
                      className={
                        formularioSeleccionado === form.value
                          ? "  seleccionado"
                          : "laboratorio"
                      }
                      key={form.value}
                    >
                      <div
                        onClick={() => {
                          setFormularioSeleccionado(form.value);
                        }}
                      >
                        {form.codigo}
                      </div>
                    </div>
                  );
                })}
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
          </>
        )}
      </div>
    </div>
  );
 */
