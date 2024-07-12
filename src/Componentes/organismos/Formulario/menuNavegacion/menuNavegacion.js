import { useState, useEffect } from "react";
import "./menuNavegacion.css";
import { NavLink } from "react-router-dom";
import logoHorizontalBlanco from "../../../../elementos/Images/logoHorizontalBlanco.png";
export default function MenuNavegacion(props) {
  const [botonesSubmenu, setBotonesSubmenu] = useState([]);

  useEffect(() => {
    if (props.submenuSeleccionado) {
      switch (props.submenuSeleccionado) {
        case "formulario":
          setBotonesSubmenu([
            { etiqueta: "Crear Formulario", uri: "/form/create" },
            { etiqueta: "Listado de formularios", uri: "/form/list" },
            { etiqueta: "Home", uri: "/" },
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
              to={"/formulario"}
              className={
                props.submenuSeleccionado === "formulario"
                  ? "boton seleccionado"
                  : "boton"
              }
            >
              Formularios
            </NavLink>
          </menu>
        </div>
      </div>
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
    </header>
  );
}
