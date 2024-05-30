import React, { useState, useEffect, useRef } from "react";

export default function TipoInt(props) {
  const { placeholderSelct, regexSelct, etiquetaSelct, infoSelct } = props;
  const [placeholder, setPlaceholder] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (placeholderSelct) {
      setPlaceholder(placeholderSelct);
    } else {
      setPlaceholder("...");
    }

    if (infoSelct) {
      setInfo(infoSelct);
    }

    if (etiquetaSelct) {
      setEtiqueta(etiquetaSelct);
    }
  }, [placeholderSelct, infoSelct, etiquetaSelct, regexSelct]);

  const validar = () => {
    if (regexSelct) {
      const regexPattern = new RegExp(regexSelct);
      if (!regexPattern.test(inputRef.current.value)) {
        setError("El valor no cumple con el formato requerido.");
      } else {
        setError("");
      }
    }
  };

  return (
    <div>
      <label>{etiqueta}</label>
      <input
        type="number"
        ref={inputRef}
        placeholder={placeholder}
        onBlur={validar}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
