import React from "react";
import { Routes, Route } from "react-router-dom";
import Formulario from "./Componentes/organismos/Formulario/Formulario";
import FormContainer from "./Componentes/atomicos/FormContainer/FormContainer";
import Home from "./elementos/Home";
class Router extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="formulario/form/create" element={<Formulario />} />
        {/* <Route path="/nuevoproceso" element={<NuevoProceso />} />
        <Route path="/proceso/:procesoId" element={<Proceso />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    );
  }
}
export default Router;
