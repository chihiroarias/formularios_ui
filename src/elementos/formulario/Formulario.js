import React, { useState, useEffect } from "react";
import "./formulario.css";
import FormularioCampo from "./FormularioCampo";
import FormularioBoton from "./FormularioBoton";

export default function Formulario(props) {
  const [formulario] = useState(props.config);
  const [campos, setCampos] = useState();
  const [contenidoCampos, setContenidoCampos] = useState({});
  const [estadoCampos, setEstadoCampos] = useState({});
  const [mensajeCampos, setMensajeCampos] = useState({});
  const [loader, setLoader] = useState(props.loader);

  // Al inicializar el formulario, crea un objeto por cada campo
  // con el nombre para ingresar el valor dinámicamente
  // Esto facilita luego el callback de submit, ya se entrega
  // un objeto listo para usar
  useEffect(() => {
    let contenidoCamposInicial = {};
    let camposInicial = [];
    if (formulario.secciones) {
      formulario.secciones.forEach((seccion) => {
        seccion.campos.forEach((campo) => {
          // Si es un dropdown con opción incicial, la carga
          if (campo.tipoitemformularioid === 5 && !campo.sinOpcionInicial) {
            contenidoCamposInicial[campo.nombre] = campo.opciones[0].value;
            return;
          }
          contenidoCamposInicial[campo.nombre] = campo.respuesta
            ? decodeURI(campo.respuesta)
            : null;
          camposInicial.push(campo);
        });
      });
    } else {
      formulario.campos.forEach((campo) => {
        // Si es un dropdown con opción incicial, la carga
        if (campo.tipoitemformularioid === 5 && !campo.sinOpcionInicial) {
          contenidoCamposInicial[campo.nombre] = campo.opciones[0].value;
          return;
        }
        contenidoCamposInicial[campo.nombre] = campo.respuesta
          ? decodeURI(campo.respuesta)
          : null;
        camposInicial.push(campo);
      });
    }
    setContenidoCampos(contenidoCamposInicial);
    setCampos(camposInicial);
  }, [formulario]);

  // props.apagarLoader apaga el loader,
  // cualquier cambio en el atributo lo apaga
  useEffect(() => {
    setLoader(props.loader);
  }, [props.loader]);

  // Función llamada en cada update de un campo, lo actualiza
  // en el padre para poder tener los datos para el submit
  function actualizarContenidoCampo(nombre, contenido) {
    let contenidoActual = { ...contenidoCampos };
    contenidoActual[nombre] = contenido;
    setContenidoCampos(contenidoActual);
    // Si un campo es requerido, está en error y ahora tiene contenido
    // se actualiza el estado
    if (estadoCampos[nombre] === "error" && contenidoActual[nombre]) {
      let estadoCamposActual = { ...estadoCampos };
      estadoCamposActual[nombre] = "";
      setEstadoCampos(estadoCamposActual);
    }
  }

  // Cuando se submittea el formulario, se verifica
  // que los campos obligatorios tengan datos
  function formSubmit(e) {
    e.preventDefault();
    // Si está enviando, ignora el submit
    if (loader) {
      return;
    }
    let camposOk = true;
    let estadoCamposActual = {};
    let mensajeCamposActual = {};
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    campos.forEach((campo) => {
      // Si algún campo requerido no tiene contenido
      if (
        campo.requerido &&
        (!contenidoCampos[campo.nombre] ||
          contenidoCampos[campo.nombre] === null ||
          contenidoCampos[campo.nombre] === "")
      ) {
        // Marca el flag como false para no submittear
        camposOk = false;
        estadoCamposActual[campo.nombre] = "error";
        mensajeCamposActual[campo.nombre] = "Campo obligatorio";
      }

      // Si el campo tiene un formato, verifica que lo cumpla
      if (
        campo.regex &&
        contenidoCampos[campo.nombre] &&
        !contenidoCampos[campo.nombre].match(new RegExp(campo.regex))
      ) {
        camposOk = false;
        estadoCamposActual[campo.nombre] = "error";
        mensajeCamposActual[campo.nombre] = "Formato incorrecto";
      }

      // Verifica que el campo email tenga formato de email
      if (
        campo.tipoitemformularioid === 2 &&
        contenidoCampos[campo.nombre] &&
        !contenidoCampos[campo.nombre].match(emailRegEx)
      ) {
        camposOk = false;
        estadoCamposActual[campo.nombre] = "error";
        mensajeCamposActual[campo.nombre] = "Formato incorrecto";
      }

      // Si el campo es de entero, verifica que sea un entero
      if (
        campo.tipoitemformularioid === 4 &&
        contenidoCampos[campo.nombre] &&
        (isNaN(contenidoCampos[campo.nombre]) ||
          contenidoCampos[campo.nombre] % 1 !== 0)
      ) {
        camposOk = false;
        estadoCamposActual[campo.nombre] = "error";
        mensajeCamposActual[campo.nombre] = "El número debe ser entero";
      }

      // Si el campo es de float, verifica que sea un número
      if (
        campo.tipoitemformularioid === 8 &&
        contenidoCampos[campo.nombre] &&
        isNaN(contenidoCampos[campo.nombre])
      ) {
        camposOk = false;
        estadoCamposActual[campo.nombre] = "error";
        mensajeCamposActual[campo.nombre] = "El campo debe ser un número";
      }

      // Si el campo no es requerido y está vacío, lo borra de la respuesta
      if (
        !campo.requerido &&
        (!contenidoCampos[campo.nombre] ||
          contenidoCampos[campo.nombre] === null ||
          contenidoCampos[campo.nombre] === "")
      ) {
        delete contenidoCampos[campo.nombre];
      }
    });
    if (!camposOk) {
      setEstadoCampos(estadoCamposActual);
      setMensajeCampos(mensajeCamposActual);
      return;
    }
    formulario.submit.callback(contenidoCampos);
  }

  // Función ejecutada al presionar un botón que no es el submit
  function botonCallback(callbackDelBoton) {
    // Si está enviando, ignora el submit
    if (loader) {
      return;
    }
    let camposOk = true;
    let estadoCamposActual = {};
    let mensajeCamposActual = {};
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    campos.forEach((campo) => {
      // Verifica que el campo email tenga formato de email
      if (
        campo.tipoitemformularioid === 2 &&
        contenidoCampos[campo.nombre] &&
        !contenidoCampos[campo.nombre].match(emailRegEx)
      ) {
        camposOk = false;
        estadoCamposActual[campo.nombre] = "error";
        mensajeCamposActual[campo.nombre] = "Formato incorrecto";
      }
    });
    if (!camposOk) {
      setEstadoCampos(estadoCamposActual);
      setMensajeCampos(mensajeCamposActual);
      return;
    }
    callbackDelBoton(contenidoCampos);
  }

  return (
    <form
      className={"flexContainer vertical formulario " + props.className}
      onSubmit={formSubmit}
    >
      {formulario.secciones &&
        formulario.secciones.map((seccion, seccionIndex) => {
          return (
            <div key={seccionIndex}>
              {seccion.nombre && <h1>{seccion.nombre}</h1>}
              {seccion.descripcion && <p>{seccion.descripcion}</p>}
              {seccion.campos.map((campo, index) => {
                return (
                  <FormularioCampo
                    onUpdate={actualizarContenidoCampo}
                    campo={campo}
                    estado={estadoCampos[campo.nombre]}
                    mensaje={mensajeCampos[campo.nombre]}
                    key={"campo" + index}
                    disabled={loader}
                    contenidoCampos={contenidoCampos}
                  />
                );
              })}
            </div>
          );
        })}
      {!formulario.secciones &&
        formulario.campos.map((campo, index) => {
          return (
            <FormularioCampo
              onUpdate={actualizarContenidoCampo}
              campo={campo}
              estado={estadoCampos[campo.nombre]}
              mensaje={mensajeCampos[campo.nombre]}
              key={"campo" + index}
              disabled={loader}
              contenidoCampos={contenidoCampos}
            />
          );
        })}
      <div className="buttonsContainer flexContainer">
        {formulario.botones &&
          formulario.botones.map((boton, index) => {
            return (
              <FormularioBoton
                config={boton}
                loader={loader}
                botonCallback={botonCallback}
                key={"boton" + index}
              />
            );
          })}
      </div>
    </form>
  );
}
