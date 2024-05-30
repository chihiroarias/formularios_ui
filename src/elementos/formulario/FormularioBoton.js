import { useState, useEffect } from "react";
import loaderImagenBlanco from "../../images/loaderImagenBlanco.png";
import loaderImagenAzul from "../../images/loaderImagen.png";
import loaderImagenVerde from "../../images/loaderImagenVerde.png";
import loaderImagenRojo from "../../images/loaderImagenRojo.png";

export default function FormularioBoton(props) {
  const [botonClickeado, setBotonClickeado] = useState(false);

  function onClick() {
    setBotonClickeado(true);
    if (props.config.tipo === "submit") {
      return;
    }
    props.botonCallback(props.config.callback);
  }

  // Cuando apaga el loader, resetea el botón clickeado
  useEffect(() => {
    if (!props.loader) {
      setBotonClickeado(false);
    }
  }, [props.loader]);

  return (
    <button
      className={
        "centrado " +
        props.config.clases +
        (props.loader && botonClickeado ? " cargando" : "") +
        (props.loader && !botonClickeado ? " disabled" : "")
      }
      type={props.config.tipo}
      disabled={props.loader}
      onClick={onClick}
    >
      {props.loader && botonClickeado && (
        <span className="flexContainer submitContainer">
          Cargando
          {props.config.clases && props.config.clases.includes("relleno") && (
            <img
              src={loaderImagenBlanco}
              className="loaderBotonFormulario"
              alt="cargando"
            />
          )}
          {props.config.clases &&
            !props.config.clases.includes("relleno") &&
            props.config.clases.includes("azul") && (
              <img
                src={loaderImagenAzul}
                className="loaderBotonFormulario"
                alt="cargando"
              />
            )}
          {props.config.clases &&
            !props.config.clases.includes("relleno") &&
            props.config.clases.includes("verde") && (
              <img
                src={loaderImagenVerde}
                className="loaderBotonFormulario"
                alt="cargando"
              />
            )}
          {props.config.clases &&
            !props.config.clases.includes("relleno") &&
            props.config.clases.includes("rojo") && (
              <img
                src={loaderImagenRojo}
                className="loaderBotonFormulario"
                alt="cargando"
              />
            )}
        </span>
      )}
      {(!props.loader || !botonClickeado) && (
        <span>{props.config.etiqueta}</span>
      )}
    </button>
  );
}
