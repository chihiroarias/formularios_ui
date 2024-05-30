import React from "react";
import PropTypes from "prop-types";

import TipoCheckbox from "../../tiposdecampos/tipoCheckbox";
import TipoString from "../../tiposdecampos/tipoString";
import TipoDate from "../../tiposdecampos/tipoDate";
import TipoDocumento from "../../tiposdecampos/tipoDocumento";
import TipoSelect from "../../tiposdecampos/tipoSelect";

// Mapeo de ids a componentes
const tiposDeCampos = {
  1: TipoCheckbox,
  2: TipoString,
  3: TipoDate,
  4: TipoDocumento,
  5: TipoSelect,
  // Agrega más tipos de campos según sea necesario
};

export default function Campo({ tipoCampo }) {
  // Obtener el componente correspondiente al tipo de campo
  const Componente = tiposDeCampos[tipoCampo];

  // Si el tipo de campo no está definido en el mapeo, puedes retornar null o un mensaje de error
  if (!Componente) {
    return <div>Tipo de campo no soportado</div>;
  }

  return (
    <div>
      <Componente />
    </div>
  );
}

// Definir los tipos de las props para validación
Campo.propTypes = {
  tipoCampo: PropTypes.number.isRequired,
};
