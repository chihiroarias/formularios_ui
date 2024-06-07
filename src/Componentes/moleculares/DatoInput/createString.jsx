import React, { useState, useRef } from "react";
import InputField from "../../atomicos/InputField/InputField";
import Label from "../../atomicos/Label/Label";
import Button from "../../atomicos/Button/Button";
import PeticionesGenerales from "../../peticionesGenerales/peticionesGenericas";
export default function CreateString() {
  const [placeholder, setPlaceholder] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [regex, setRegex] = useState("");
  const [obl, setObl] = useState("");
  const [indice, setIndice] = useState(0);
  const [campoString, setCampoString] = useState(null); // Estado para almacenar el componente generado

  const placeHolderRef = useRef(null);
  const labelRef = useRef(null);
  const infoRef = useRef(null);
  const regexRef = useRef(null);
  const oblRef = useRef(null);
  const indiceRef = useRef(null);
  const typeRef = useRef(null);

  function crearCampoString() {
    const placeholder = placeHolderRef.current.value;
    const etiqueta = labelRef.current.value;
    const info = infoRef.current.value;
    const regex = regexRef.current.value;
    const obl = oblRef.current.checked; // Cambiado a .checked para checkbox
    const type = typeRef.current.value;
    console.log(type);
    const indice = indiceRef.current.value;

    // Guarda el componente generado en el estado
    setCampoString(
      <div>
        <InputField
          id={etiqueta}
          name={etiqueta}
          type={info}
          validation={regex}
          placeholder={placeholder}
          obl={obl}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Label name={"PLACEHOLDER"} htmlFor={"PLACEHOLDER"} />
        <input
          htmlFor="PLACEHOLDER"
          type="text"
          ref={placeHolderRef}
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
      </div>
      <div>
        <Label name={"ETIQUETA"} htmlFor={"ETIQUETA"} />
        <input
          htmlFor="ETIQUETA"
          type="text"
          ref={labelRef}
          value={etiqueta}
          onChange={(e) => setEtiqueta(e.target.value)}
        />
      </div>
      <div>
        <Label name={"INFO"} htmlFor={"INFO"} />
        <input
          htmlFor="INFO"
          type="text"
          ref={infoRef}
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
      </div>
      <div>
        <Label name={"Tipo de Dato"} htmlFor={"tipoDeDato"} />
        <select htmlFor="tipoDeDato" ref={typeRef}>
          <option value="text">Texto</option>
          <option value="Number">Numero</option>
          <option value="date">Fecha</option>
          <option value="email">Email</option>
          <option value="tel">Telefono</option>
          <option value="url">Url</option>
          <option value="textarea">Textarea</option>
        </select>
      </div>
      <div>
        <Label name={"REGEX"} htmlFor={"regex"} />
        <input
          htmlFor="regex"
          type="text"
          ref={regexRef}
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
        />
      </div>
      <div>
        <Label name={"indice"} htmlFor={"indice"} />
        <input
          htmlFor="indice"
          type="text"
          ref={indiceRef}
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
        />
      </div>
      <div>
        <div>
          <Label name={"Obligatorio"} htmlFor={"Obligatorio"} />
          <input
            htmlFor="Obligatorio"
            type="checkbox"
            ref={oblRef}
            onChange={(e) => setObl(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={crearCampoString} text="Crear Campo" />
        <br />
        <PeticionesGenerales />
        <br />
        <div>{campoString}</div>
      </div>
      <br />
    </div>
  );
}
