import loaderImagen from "../../elementos/Images/loaderImagen.png";
import loaderImagenBlanco from "../../elementos/Images/loaderImagenBlanco.png";
import "./loader.css";

export default function Loader(props) {
  return (
    <div className="loaderContainer flexContainer vertical">
      <div className={`loaderImagenContainer centrado ${props.clases}`}>
        {props.color === "blanco" && (
          <img className="loaderImagen" src={loaderImagenBlanco} alt="loader" />
        )}
        {props.color !== "blanco" && (
          <img className="loaderImagen" src={loaderImagen} alt="loader" />
        )}
      </div>
      <div className="loaderTexto centrado">{props.children}</div>
    </div>
  );
}
