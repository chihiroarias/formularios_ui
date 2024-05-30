import loaderImagen from "../../images/loaderImagen.png";
import "./formulario.css";

export default function LoaderFormulario(props) {
  return (
    <div className="loaderFormularioContainer flexContainer horizontal">
      <span></span>
      <img
        className="loaderFormularioImagen centrado"
        src={loaderImagen}
        alt="loader"
      />
      <span className="centrado">Cargando</span>
    </div>
  );
}
