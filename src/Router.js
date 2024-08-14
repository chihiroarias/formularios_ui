import React from "react";
import { Routes, Route } from "react-router-dom";
import Formulario from "./Componentes/organismos/Formulario/Formulario";
import Home from "./elementos/Home";
import Formularios from "./Componentes/organismos/Formulario/Formularios";
import EditorFormulario from "./Componentes/organismos/Formulario/EditorFormulario";
class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="formulario/form/create" element={<Formulario />} />
        <Route path="formulario/form/list" element={<Formularios />} />
        <Route
          path="formulario/form/edit/:formid"
          element={<EditorFormulario />}
        />
      </Routes>
    );
  }
}
export default Router;
