import React, { useState, useEffect, useRef } from "react";
import LoaderFormulario from "./LoaderFormulario";
import { accessAPI } from "../../utils/utils";

export default function FormularioCampo(props) {
  const campoRef = useRef();
  const { campo, contenidoCampos } = props;
  const [opciones, setOpciones] = useState();
  const [queryparamsActual, setQueryparamsActual] = useState([]);

  // listo se utiliza para cuando no tengo datos para mostrar pero no quiero mostrar el loader
  const [listo, setListo] = useState(false);
  const [loader, setLoader] = useState(true);

  // Cuando cambia el campo, actualiza el padre
  function campoOnChange() {
    let contenido;
    if (campo.tipoitemformularioid === 6) {
      contenido = +campoRef.current.checked;
    } else {
      contenido = campoRef.current.value;
    }
    props.onUpdate(props.campo.nombre, contenido);
  }

  // Los tipos de campo son:
  // 1 - texto
  // 2 - email
  // 3 - password
  // 4 - numero entero
  // 5 - dropdown
  // 6 - checkbox
  // 7 - Date
  // 8 - numero float

  // Cuando carga el componente verifica si el tipo es dropdown y si le pasaron el array de opciones
  useEffect(() => {
    if (campo) {
      if (campo.tipoitemformularioid === 5) {
        // Si no tiene queryparams y ya no cargó las opciones
        if (!campo.queryparams) {
          if (!opciones) {
            // Si le pasa las opciones como array, las asigna
            if (Array.isArray(campo.opciones)) {
              setListo(true);
              setOpciones(campo.opciones);
            } else {
              // Si no se lo pasaron, va a buscar las opciones
              setListo(true);
              accessAPI(
                "GET",
                campo.opciones,
                null,
                (respuesta) => {
                  setOpciones(respuesta);
                },
                (respuesta) => {
                  alert(respuesta[0].msg);
                }
              );
            }
          }
        } else {
          // Si tiene queryparams, tiene que determinarlos antes de ir a buscar las opciones
          setLoader(false);
          let url = `${campo.opciones}?`;
          let camposCompletos = true;
          let cambioQueryparams = false;
          // Verifica que esté seteado y que haya cambiado desde la última vez
          for (const queryparam of campo.queryparams) {
            if (!contenidoCampos[queryparam]) {
              camposCompletos = false;
            } else {
              url = url + `${queryparam}=${contenidoCampos[queryparam]}&`;
              // Verifica que haya cambiado desde la última vez
              if (
                contenidoCampos[queryparam] !== queryparamsActual[queryparam]
              ) {
                cambioQueryparams = true;
              }
            }
          }
          // Si están todos los queryparams, y cambiaron desde la última vez
          if (camposCompletos && cambioQueryparams) {
            setQueryparamsActual(contenidoCampos);
            setListo(true);
            setLoader(true);
            accessAPI(
              "GET",
              url,
              null,
              (respuesta) => {
                setOpciones(respuesta);
              },
              (respuesta) => {
                alert(respuesta[0].msg);
              }
            );
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campo, contenidoCampos]);

  // Cuando carga las opciones apaga el loader
  useEffect(() => {
    if (opciones) {
      setLoader(false);
    }
  }, [opciones]);

  return (
    <div className="prettyInputContainer flexContainer vertical">
      <div className="prettyInputEtiquetaContainer centrado">
        <div className="prettyInputEtiqueta centrado">
          {campo.etiqueta}
          {props.mensaje && props.estado === "error" && (
            <span className="mensajeError"> - {props.mensaje}</span>
          )}
        </div>
      </div>
      {(campo.tipoitemformularioid === 1 ||
        campo.tipoitemformularioid === 2) && (
        <input
          type="text"
          onChange={campoOnChange}
          className={props.estado + " prettyInput centrado"}
          disabled={props.disabled}
          defaultValue={
            props.campo.respuesta ? decodeURI(props.campo.respuesta) : null
          }
          ref={campoRef}
        />
      )}
      {campo.tipoitemformularioid === 3 && (
        <input
          type="password"
          onChange={campoOnChange}
          className={props.estado + " prettyInput centrado"}
          disabled={props.disabled}
          defaultValue={props.campo.respuesta}
          ref={campoRef}
        />
      )}
      {campo.tipoitemformularioid === 4 && (
        <input
          type="number"
          onChange={campoOnChange}
          className={props.estado + " prettyInput centrado"}
          disabled={props.disabled}
          defaultValue={props.campo.respuesta}
          step="any"
          ref={campoRef}
        />
      )}
      {campo.tipoitemformularioid === 5 && (
        <>
          {loader && <LoaderFormulario />}
          {!loader && listo && (
            <select
              defaultValue={campo.sinOpcionInicial ? "0" : opciones[0].value}
              disabled={props.disabled}
              ref={campoRef}
              onChange={campoOnChange}
              className={props.estado + " prettyInput centrado"}
            >
              {campo.sinOpcionInicial && <option value="" />}
              {opciones &&
                opciones.map((opcion) => {
                  return (
                    <option value={opcion.value} key={opcion.value}>
                      {opcion.etiqueta}
                    </option>
                  );
                })}
            </select>
          )}
          {!loader && !listo && (
            <input
              type="text"
              className={`${props.estado} prettyInput centrado disabled`}
              disabled={true}
              defaultValue="Esperando otro campo..."
            />
          )}
        </>
      )}
      {campo.tipoitemformularioid === 6 && (
        <>
          <input
            type="checkbox"
            onChange={campoOnChange}
            className={props.estado + " prettyCheckbox centrado"}
            disabled={props.disabled}
            defaultChecked={props.campo.respuesta}
            ref={campoRef}
            id="checkbox"
          />
        </>
      )}
      {campo.tipoitemformularioid === 7 && (
        <>
          <input
            type="date"
            onChange={campoOnChange}
            className={props.estado + " prettyInput centrado"}
            disabled={props.disabled}
            defaultValue={props.campo.respuesta}
            ref={campoRef}
          />
        </>
      )}
      {campo.tipoitemformularioid === 8 && (
        <input
          type="number"
          step="any"
          onChange={campoOnChange}
          className={props.estado + " prettyInput centrado"}
          disabled={props.disabled}
          defaultValue={props.campo.respuesta}
          ref={campoRef}
        />
      )}
    </div>
  );
}
