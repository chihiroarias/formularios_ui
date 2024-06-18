import Heading from "../../moleculares/Header/Header.jsx";
import FormDescription from "../../moleculares/FormDescription/FormDescription.jsx";
import Campo from "../Campo/Campo.jsx";
import Button from "../../atomicos/Button/Button.jsx";
import { useState, useEffect } from "react";

function Formulario() {
  const [campoNuevo, setCampoNuevo] = useState(null);

  function agregarCampo() {
    setCampoNuevo(null);
    setCampoNuevo(<Campo />);
  }

  useEffect(() => {});

  return (
    <div>
      <Heading />
      <FormDescription />
      <Campo />
      <Button clickHandler={agregarCampo()} />
    </div>
  );
}

export default Formulario;
