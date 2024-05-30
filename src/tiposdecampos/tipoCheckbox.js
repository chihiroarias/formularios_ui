import React, { useState, useEffect } from "react";

export default function TipoCheckbox(props) {
  const { etiquetaSelct, infoSelct, opciones } = props;
  const [etiqueta, setEtiqueta] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [seleccion, setSeleccion] = useState(null);

  useEffect(() => {
    if (infoSelct) {
      setInfo(infoSelct);
    }

    if (etiquetaSelct) {
      setEtiqueta(etiquetaSelct);
    }
  }, [infoSelct, etiquetaSelct]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSeleccion(value);
  };

  return (
    <div>
      {etiqueta && <label>{etiqueta}</label>}
      <div>
        {opciones &&
          opciones.map((opcion, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={opcion.valor}
                name="checkboxGroup"
                value={opcion.valor}
                checked={seleccion === opcion.valor}
                onChange={handleChange}
              />
              <label htmlFor={opcion.valor}>{opcion.nombre}</label>
            </div>
          ))}
      </div>
      {info && <p>{info}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
