/*
setMensajeNotificacion({
  mensaje: response[0].msg,
  temporal: true,
  error: true,
});
*/

import { useState, useEffect } from "react";
import "./notificacion.css";

export default function Notificacion(props) {
  const [mensaje, setMensaje] = useState();
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (props.config) {
      if (props.config.mensaje) {
        setMensaje(props.config);
        setMostrar(true);
      }
      if (props.config.temporal && props.config.temporal === true) {
        setTimeout(() => {
          setMostrar(null);
        }, 6000);
      }
    }
  }, [props]);

  function esconderNotificacion() {
    setMostrar(false);
  }

  return (
    <div
      className={"mensajeNotificacionContainer " + (mostrar ? "mostrar " : "")}
      onClick={esconderNotificacion}
    >
      {mensaje && (
        <div
          className={
            "mensajeNotificacion " +
            (mensaje.error ? "error " : "") +
            (mensaje.temporal ? "temporal" : "")
          }
        >
          {mensaje.mensaje}
        </div>
      )}
    </div>
  );
}
