import { useState, useEffect, useRef } from "react";
import "./campoEditable.css";
import cancelarIcono from "../Images/cancelarIcono.png";
import confirmarIcono from "../Images/confirmarIcono.png";
import flechaDerechaIcono from "../Images/flechaDerechaIcono.png";
import loaderImagen from "../Images/loaderImagen.png";
import { accessAPI } from "../../Utils/utils";
import Notificacion from "../../elementos/notificacion/Notificacion";

export default function CampoEditable(props) {
  const [editando, setEditando] = useState(false);
  const [loader, setLoader] = useState(true);
  const [valor, setValor] = useState(props.valor);

  const { booleano } = props;

  const [dropdownOpciones, setDropdownOpciones] = useState(
    props.dropdownopciones
  );

  const [mensajeNotificacion, setMensajeNotificacion] = useState();

  const campoRef = useRef();

  // El componente comienza con el loader encendido, si no es un
  // dropdown, lo apaga en seguida
  // Si es un dropdown, carga el valor por defecto
  useEffect(() => {
    if (!props.dropdownurl) {
      setLoader(false);
    }
  }, [valor, props.dropdownurl]);

  // Cuando entra en modo edición, si es un dropdown, va a buscar los parámetros
  useEffect(() => {
    if (editando) {
      if (props.dropdownurl && !dropdownOpciones) {
        accessAPI(
          "GET",
          props.dropdownurl,
          null,
          (respuesta) => {
            setDropdownOpciones(respuesta);
            setLoader(false);
          },
          (respuesta) => {
            // Si la API da error, devuelve el error al cliente
            setMensajeNotificacion({
              mensaje: respuesta[0].msg,
              temporal: true,
              error: true,
            });
            setLoader(false);
          }
        );
      }
    }
  }, [
    editando,
    props.dropdownurl,
    props.entidadid,
    props.valor,
    dropdownOpciones,
  ]);

  // Función ejecutada al confirmar el cambio de un campo
  function actualizarCampo() {
    let dato = booleano ? campoRef.current.checked : campoRef.current.value;
    setLoader(true);
    const nuevoValor = props.esBooleano
      ? campoRef.current.checked
      : campoRef.current.value;
    accessAPI(
      "PUT",
      `${props.endpoint}/${props.entidadid}`,
      { campo: props.campo, dato },
      () => {
        // Si es un dropdown, va a buscar la etiqueta en lugar del valor
        if (props.dropdownurl) {
          dropdownOpciones.forEach((opcion) => {
            if (
              // DESHABILITO ESLINT PORQUE NECESITO QUE JS PARSEE EL VALUE SELECCIONADO
              // eslint-disable-next-line
              opcion.value == campoRef.current.value
            ) {
              setValor(opcion.etiqueta);
            }
          });
        } else if (props.esBooleano) {
          setValor(nuevoValor ? "Sí" : "No");
        } else {
          setValor(dato);
        }
        setEditando(false);
        setLoader(false);
      },
      (respuesta) => {
        // Si la API da error, devuelve el error al cliente
        setMensajeNotificacion({
          mensaje: respuesta[0].msg,
          temporal: true,
          error: true,
        });
        setLoader(false);
      }
    );
  }

  // Captura las teclas de enter y escape para confirmar el ingreso del campo
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      actualizarCampo();
      return;
    }

    if (event.key === "Escape") {
      setEditando(false);
      return;
    }
  };

  return (
    <div>
      <Notificacion config={mensajeNotificacion} />
      <div className="campoEditableContainer flexContainer">
        {editando === false && (
          <>
            <span
              className="campoNombre"
              onClick={() => {
                setEditando(true);
              }}
            >
              {props.etiqueta}:
            </span>

            {valor && !booleano && (
              <>
                <span className="campoEditable">{valor}</span>
                {props.recursoUri && (
                  <a href={`${props.recursoUri}`} rel="noreferrer">
                    <img
                      className="centrado"
                      src={flechaDerechaIcono}
                      alt="ira"
                    />
                  </a>
                )}
              </>
            )}

            {!valor && !booleano && (
              <span
                className="sinDato"
                onClick={() => {
                  setEditando(true);
                }}
              >
                Ingresar
              </span>
            )}

            {valor && booleano && <span>Sí</span>}
            {!valor && booleano && <span>No</span>}
          </>
        )}
        {editando && !props.dropdownurl && !dropdownOpciones && (
          <>
            {!loader && (
              <span className="flexContainer campoNombre">
                <img
                  className="icono"
                  src={cancelarIcono}
                  onClick={() => {
                    setEditando(false);
                  }}
                  alt="cancelar"
                />
                {!props.noEditable && props.campo && (
                  <img
                    className="icono"
                    src={confirmarIcono}
                    onClick={actualizarCampo}
                    alt="confirmar"
                  />
                )}
              </span>
            )}
            {loader && (
              <span className="campoNombre">
                <img
                  src={loaderImagen}
                  className="campoEditableLoader"
                  alt="loader"
                />
              </span>
            )}
            {!props.noEditable &&
              props.campo &&
              !props.esFecha &&
              !booleano && (
                <input
                  className="prettyInput"
                  type="text"
                  defaultValue={valor}
                  disabled={loader}
                  ref={campoRef}
                  onKeyDown={handleKeyDown}
                />
              )}

            {!props.noEditable && props.campo && props.esFecha && !booleano && (
              <input
                className="prettyInput"
                type="date"
                defaultValue={valor}
                disabled={loader}
                ref={campoRef}
                onKeyDown={handleKeyDown}
              />
            )}
            {!props.noEditable && props.campo && !props.esFecha && booleano && (
              <input
                type="checkbox"
                defaultChecked={valor === "Sí"}
                ref={campoRef}
              />
            )}
            {(!props.campo || props.noEditable) && (
              <span className="campoNombre">
                {props.noEditable || "No puede ser editado"}
              </span>
            )}
          </>
        )}

        {!props.noEditable &&
          editando &&
          (props.dropdownurl || dropdownOpciones) && (
            <>
              {!loader && (
                <span className="flexContainer campoNombre">
                  <img
                    className="icono"
                    src={cancelarIcono}
                    onClick={() => {
                      setEditando(false);
                    }}
                    alt="cancelar"
                  />
                  <img
                    className="icono"
                    src={confirmarIcono}
                    onClick={actualizarCampo}
                    alt="confirmar"
                  />
                </span>
              )}

              {loader && (
                <span className="campoNombre">
                  <img
                    src={loaderImagen}
                    className="campoEditableLoader"
                    alt="loader"
                  />
                </span>
              )}
              <select className="prettyInput" disabled={loader} ref={campoRef}>
                {dropdownOpciones &&
                  dropdownOpciones.map((opcion) => {
                    return (
                      <option value={opcion.value} key={opcion.value}>
                        {opcion.etiqueta}
                      </option>
                    );
                  })}
              </select>
            </>
          )}

        {props.noEditable && editando && props.dropdownurl && (
          <>
            <span className="flexContainer campoNombre">
              <img
                className="icono"
                src={cancelarIcono}
                onClick={() => {
                  setEditando(false);
                }}
                alt="cancelar"
              />
            </span>
            <span className="campoNombre">
              {props.noEditable || "No puede ser editado"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
