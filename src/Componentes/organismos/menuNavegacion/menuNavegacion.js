import "./menuNavegacion.css";
import { NavLink } from "react-router-dom";
import logoHorizontalBlanco from "../../../elementos/Images/logoHorizontalBlanco.png";
export default function MenuNavegacion(props) {
  return (
    <header>
      <div className="mainMenuContainer pt-2">
        <div className="mainMenu flexContainer spaceBetween">
          <div className="logoContainer flexContainer vertical">
            <NavLink to={"/"}>
              <img src={logoHorizontalBlanco} alt="logo" />
            </NavLink>
          </div>
          <div className="bordeLogo mr-5"></div>

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
              to={"/"}
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
