import { useState, useEffect } from "react";
import "./menuNavegacion.css";
import { NavLink } from "react-router-dom";
import logoHorizontalBlanco from "../../../elementos/Images/logoHorizontalBlanco.png";
export default function MenuNavegacion(props) {
  const [botonesSubmenu, setBotonesSubmenu] = useState([]);

  useEffect(() => {
    if (props.submenuSeleccionado) {
      switch (props.submenuSeleccionado) {
        case "formulario":
          setBotonesSubmenu([
            { etiqueta: "Home", uri: "/" },
            { etiqueta: "Crear Formulario", uri: "/form/create" },
            {
              etiqueta: "Listado de formularios",
              uri: "/formulario/form/list",
            },
          ]);
          break;
        case "proveedores":
          setBotonesSubmenu([]);
          break;

        default:
      }
    }
  }, [props.submenuSeleccionado]);

  return (
    <header>
      <div className="mainMenuContainer">
        <div className="mainMenu flexContainer spaceBetween">
          <div className="logoContainer flexContainer vertical">
            <NavLink to={"/"}>
              <img src={logoHorizontalBlanco} alt="logo" />
            </NavLink>
          </div>
          <div className="bordeLogo"></div>

          <menu className="flexContainer">
            <NavLink
              to={"/formulario/form/create"}
              className={
                props.submenuSeleccionado === "formulario"
                  ? "boton seleccionado"
                  : "boton"
              }
            >
              Crear Formularios
            </NavLink>
            <NavLink
              to={"/formulario/form/list"}
              className={
                props.submenuSeleccionado === "formulario"
                  ? "boton seleccionado"
                  : "boton"
              }
            >
              Listado de Formularios
            </NavLink>
            <NavLink
              to={"/formulario/form/list"}
              className={
                props.submenuSeleccionado === "formulario"
                  ? "boton seleccionado"
                  : "boton"
              }
            >
              HOME
            </NavLink>
          </menu>
        </div>
      </div>
    </header>
  );
}
/*
<div className="submenu">
        <div className="submenuButtonsContainer flexContainer">
          {botonesSubmenu &&
            botonesSubmenu.map((boton, index) => {
              return (
                <NavLink className="boton" key={index} to={boton.uri}>
                  {boton.etiqueta}
                </NavLink>
              );
            })}
        </div>
      </div>
*/
