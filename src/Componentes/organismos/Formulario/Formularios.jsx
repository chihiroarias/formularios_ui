import { useState, useEffect } from "react";
import { accessAPI } from "../../../Utils/utils";
import { useParams } from "react-router-dom";
import MenuNavegacion from "../menuNavegacion/menuNavegacion.js";
import Loader from "../../../elementos/loader/Loader";
import "./formularios.css";
import MuestraCampoForm from "../../moleculares/MuestraCampoForm/MuestraCampoForm";
import EditFieldData from "./EditFieldData";
import Notificacion from "../../../elementos/notificacion/Notificacion.js";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function Formularios() {
  const [loader, setLoader] = useState(true);
  const [loaderFormulario, setLoaderFormulario] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState();
  const [formularios, setFormularios] = useState([]);
  const [formulario, setFormulario] = useState(null);
  const [campoEnEdicion, setCampoEnEdicion] = useState(null);
  const [campoEnEliminacion, setCampoEnEliminacion] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState();

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
        setMensajeNotificacion({
          mensaje: response[0].msg,
          temporal: true,
          error: true,
        });
      }
    );
    setFormularioSeleccionado(formularioId);
  }, [formularioId]);

  useEffect(() => {
    if (formularioSeleccionado) {
      setFormulario(null);
      setLoaderFormulario(true);
      accessAPI(
        "GET",
        `admin/form/formversion/${formularioSeleccionado}`,
        null,
        (response) => {
          setFormulario(response);
          setLoaderFormulario(false);
          setCampoEnEliminacion(false);
        },
        (response) => {
          console.log(response);
          setLoaderFormulario(false);
          setFormularioSeleccionado(null);
          setCampoEnEliminacion(false);
        }
      );
    }
  }, [formularioSeleccionado, campoEnEliminacion]);

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

  // Función para eliminar un campo
  const eliminarCampo = (campoId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#56638a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        accessAPI(
          "DELETE",
          `admin/form/formversion/${campoId}`,
          { formvid: formularioSeleccionado },
          (response) => {
            // Actualizar la lista de campos después de la eliminación
            setFormulario((prevForm) => ({
              ...prevForm,
              campos: prevForm.campos.filter((campo) => campo.id !== campoId),
            }));
            setCampoEnEliminacion(true);
            Swal.fire("¡Eliminado!", "El campo ha sido eliminado.", "success");
          },
          (response) => {
            setMensajeNotificacion({
              mensaje: response[0].msg,
              temporal: true,
              error: true,
            });

            Swal.fire("Error", "No se pudo eliminar el campo.", "error");
          }
        );
      }
    });
  };

  return (
    <div className="seccion laboratorio">
      <MenuNavegacion submenuSeleccionado="formularios" />
      <Notificacion config={mensajeNotificacion} />
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
                          <EditFieldData
                            key={campo.id}
                            fieldData={campoEnEdicion}
                            updateField={updateField}
                            cancelEdit={cancelEdit}
                          />
                        ) : (
                          <div key={campo.campoid}>
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

                              <div>
                                <MdEdit
                                  className={"edit-icon ml-5"}
                                  onClick={() => setCampoEnEdicion(campo)}
                                />
                                <MdDelete
                                  className={"delete-icon ml-5"}
                                  onClick={() => eliminarCampo(campo.campoid)}
                                />
                              </div>
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
